const XLSX = require("xlsx");
const axios = require("axios");
const Product = require("../models/Product");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

const IMAGE_BASE_URL = process.env.CLOUDFLARE_R2_IMAGE_BASE_URL;

const getAutoThumbnail = (sku) => `${IMAGE_BASE_URL}/${sku}.png`;
const getGalleryUrl = (sku, index) => `${IMAGE_BASE_URL}/${sku}-${index}.png`;

// Check if a URL actually exists (HEAD request)
const urlExists = async (url) => {
  try {
    const res = await axios.head(url, { timeout: 3000 });
    return res.status === 200;
  } catch {
    return false;
  }
};

// Auto-detect gallery images: [SKU]-1.png, [SKU]-2.png ... up to maxCheck
const autoDetectGallery = async (sku, maxCheck = 5) => {
  const gallery = [];
  for (let i = 1; i <= maxCheck; i++) {
    const url = getGalleryUrl(sku, i);
    const exists = await urlExists(url);
    if (exists) gallery.push(url);
    else break; // stop at first missing (sequential naming assumed)
  }
  return gallery;
};

// POST /api/bulk-upload/products
const bulkUploadProducts = async (req, res, next) => {
  try {
    if (!req.file) {
      const err = new Error("No Excel file provided");
      err.statusCode = 400;
      return next(err);
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    if (!rows.length) {
      const err = new Error("Excel file is empty");
      err.statusCode = 400;
      return next(err);
    }

    const [allCategories, allSubCategories] = await Promise.all([
      Category.find().lean(),
      SubCategory.find().lean(),
    ]);

    const catMap = {};
    allCategories.forEach((c) => { catMap[c.slug.toLowerCase()] = c._id; });
    const subMap = {};
    allSubCategories.forEach((s) => { subMap[s.slug.toLowerCase()] = s._id; });

    const results = { success: 0, skipped: 0, errors: [] };

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowNum = i + 2;

      const sku = String(row.sku || row.SKU || "").trim().toUpperCase();
      const name = String(row.name || row.Name || "").trim();

      if (!sku || !name) {
        results.errors.push(`Row ${rowNum}: Missing name or SKU`);
        results.skipped++;
        continue;
      }

      const categorySlug = String(row.category || row.Category || "").trim().toLowerCase();
      const categoryId = catMap[categorySlug];
      if (!categoryId) {
        results.errors.push(`Row ${rowNum} (${sku}): Category "${categorySlug}" not found`);
        results.skipped++;
        continue;
      }

      const subCategorySlug = String(row.subcategory || row.subCategory || row.SubCategory || "").trim().toLowerCase();

      // --- Thumbnail ---
      const rawThumbnail = String(row.thumbnail || row.Thumbnail || row.image || row.Image || "").trim();
      const thumbnail = rawThumbnail || getAutoThumbnail(sku);

      // --- Gallery ---
      let gallery = [];
      const rawGallery = String(row.gallery || row.Gallery || "").trim();

      if (rawGallery) {
        // Excel mein comma-separated URLs diye hain
        gallery = rawGallery.split(",").map((u) => u.trim()).filter(Boolean);
      } else {
        // Auto-detect: [SKU]-1.png, [SKU]-2.png ...
        gallery = await autoDetectGallery(sku);

        // Agar koi gallery image nahi mili to thumbnail hi gallery mein bhi
        if (gallery.length === 0) {
          gallery = [thumbnail];
        }
      }

      const product = {
        name,
        sku,
        slug: name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        description: String(row.description || row.Description || "").trim(),
        thumbnail,
        gallery,
        category: categoryId,
        subCategory: subMap[subCategorySlug] || undefined,
        material: String(row.material || row.Material || "").trim(),
        finish: String(row.finish || row.Finish || "").trim(),
        moq: String(row.moq || row.MOQ || "100 pcs").trim(),
      };

      // Warn if subcategory not found but don't skip
      if (subCategorySlug && !subMap[subCategorySlug]) {
        results.errors.push(`Row ${rowNum} (${sku}): SubCategory "${subCategorySlug}" not found - product saved without subcategory`);
      }

      try {
        await Product.findOneAndUpdate(
          { sku: product.sku },
          product,
          { upsert: true, new: true, runValidators: false }
        );
        results.success++;
      } catch (err) {
        results.errors.push(`SKU ${sku}: ${err.message}`);
        results.skipped++;
      }
    }

    res.status(200).json({
      success: true,
      message: `${results.success} products uploaded, ${results.skipped} skipped`,
      results,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/bulk-upload/template
const downloadTemplate = (req, res) => {
  const headers = ["name", "sku", "category", "subcategory", "material", "finish", "moq", "description", "thumbnail", "gallery"];
  const sampleRow = [
    "Acacia Chopping Board",
    "SH-CBW-26-01",
    "wooden",
    "kitchenware-serveware",
    "Acacia Wood",
    "Natural Oil",
    "100 pcs",
    "Product description here",
    "",  // blank = auto from SKU
    "",  // blank = auto detect gallery
  ];

  const ws = XLSX.utils.aoa_to_sheet([headers, sampleRow]);

  // Column widths
  ws["!cols"] = headers.map(() => ({ wch: 25 }));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Products");
  const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  res.setHeader("Content-Disposition", "attachment; filename=product-template.xlsx");
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.send(buffer);
};

module.exports = { bulkUploadProducts, downloadTemplate };
