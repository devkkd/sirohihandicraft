const express = require("express");
const router = express.Router();
const multer = require("multer");
const protect = require("../middleware/protect");
const { bulkUploadProducts, downloadTemplate } = require("../controllers/bulkUploadController");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("spreadsheet") || file.mimetype.includes("excel") || file.originalname.endsWith(".xlsx") || file.originalname.endsWith(".xls")) {
      cb(null, true);
    } else {
      cb(new Error("Only Excel files allowed"), false);
    }
  },
});

router.get("/template", protect, downloadTemplate);
router.post("/products", protect, upload.single("file"), bulkUploadProducts);

// Multiple image upload - returns public URLs
const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files allowed"), false);
  },
});

const { uploadToCloudflare } = require("../utils/cloudflare");
const CatalogImage = require("../models/CatalogImage");

// Regular image upload (returns URLs only)
router.post("/images", protect, imageUpload.array("images", 500), async (req, res, next) => {
  try {
    if (!req.files?.length) {
      return res.status(400).json({ success: false, message: "No images provided" });
    }

    const results = await Promise.allSettled(
      req.files.map((file) =>
        uploadToCloudflare(file.buffer, file.mimetype, file.originalname)
      )
    );

    const uploaded = [];
    const failed = [];

    results.forEach((r, i) => {
      if (r.status === "fulfilled") {
        uploaded.push({ name: req.files[i].originalname, url: r.value });
      } else {
        failed.push({ name: req.files[i].originalname, error: r.reason?.message });
      }
    });

    res.status(200).json({
      success: true,
      message: `${uploaded.length} uploaded, ${failed.length} failed`,
      uploaded,
      failed,
    });
  } catch (error) {
    next(error);
  }
});

// Catalog image upload - uploads to R2 + saves to DB automatically
// Filename format: 00.jpg, 01.jpg ... 116.jpg
router.post("/catalog", protect, imageUpload.array("images", 200), async (req, res, next) => {
  try {
    if (!req.files?.length) {
      return res.status(400).json({ success: false, message: "No images provided" });
    }

    // Sort files by filename numerically (00, 01, 02 ...)
    const sortedFiles = [...req.files].sort((a, b) => {
      const numA = parseInt(a.originalname.replace(/\D/g, "")) || 0;
      const numB = parseInt(b.originalname.replace(/\D/g, "")) || 0;
      return numA - numB;
    });

    const uploaded = [];
    const failed = [];

    // Upload all to R2
    const uploadResults = await Promise.allSettled(
      sortedFiles.map((file) =>
        uploadToCloudflare(file.buffer, file.mimetype, file.originalname)
      )
    );

    // Save to DB
    const toInsert = [];
    uploadResults.forEach((r, i) => {
      const file = sortedFiles[i];
      const order = parseInt(file.originalname.replace(/\D/g, "")) || i;
      if (r.status === "fulfilled") {
        toInsert.push({ url: r.value, sku: file.originalname.replace(/\.[^.]+$/, ""), order });
        uploaded.push({ name: file.originalname, url: r.value });
      } else {
        failed.push({ name: file.originalname, error: r.reason?.message });
      }
    });

    if (toInsert.length) {
      // Upsert by order - agar already exist kare to update karo
      await Promise.all(
        toInsert.map((img) =>
          CatalogImage.findOneAndUpdate({ order: img.order }, img, { upsert: true, new: true })
        )
      );
    }

    res.status(200).json({
      success: true,
      message: `${uploaded.length} catalog images uploaded & saved, ${failed.length} failed`,
      uploaded,
      failed,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
