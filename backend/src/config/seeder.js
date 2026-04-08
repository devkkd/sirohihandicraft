require("dotenv").config({ path: "../../.env" });
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const mongoose = require("mongoose");
const connectDB = require("./db");

const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const Product = require("../models/Product");

const categoriesData = [
  { slug: "wooden", title: "WOODEN", description: "Explore our handcrafted wooden collection, featuring sustainable and beautifully designed pieces to elevate your living spaces." },
  { slug: "marble", title: "MARBLE", description: "Discover the elegance of our natural marble collection. Perfect for adding sophistication to your spaces." },
];

const subCategoriesData = [
  { name: "Kitchenware & Serveware", slug: "kitchenware-serveware", categorySlug: "wooden", image: "/images/sub/kitchenware.jpg" },
  { name: "Kitchen Accessories & Utility", slug: "kitchen-accessories-utility", categorySlug: "wooden", image: "/images/sub/kitchen-accessories.jpg" },
  { name: "Home Décor & Accessories", slug: "home-decor-accessories", categorySlug: "wooden", image: "/images/sub/home-decor.jpg" },
  { name: "Furniture & Lifestyle", slug: "furniture-lifestyle", categorySlug: "wooden", image: "/images/sub/furniture.jpg" },
  { name: "Other", slug: "other", categorySlug: "wooden", image: "/images/sub/other.jpg" },
  { name: "Marble Bathroom Collection", slug: "marble-bathroom", categorySlug: "marble", image: "/images/sub/marble-bathroom.jpg" },
  { name: "Marble Kitchen Collection", slug: "marble-kitchen", categorySlug: "marble", image: "/images/sub/marble-kitchen.jpg" },
  { name: "Marble Home & Kitchen Accessories", slug: "marble-home-kitchen", categorySlug: "marble", image: "/images/sub/marble-home.jpg" },
];

const productsData = [
  { name: "Acacia Chopping Board", sku: "SH-CBW-26-38", image: "/images/products/wood-chopping.jpg", categorySlug: "wooden", subcategorySlug: "kitchenware-serveware", material: "Acacia Wood (FSC Certified)", finish: "Natural Food-Safe Oil", moq: "20 pcs" },
  { name: "Classic Salad Bowl", sku: "SH-BLW-26-51", image: "/images/products/wood-bowl.jpg", categorySlug: "wooden", subcategorySlug: "kitchen-accessories-utility", material: "Mango Wood", finish: "Matte Varnish", moq: "50 pcs" },
  { name: "Round Butler Tray", sku: "SH-TRW-26-37", image: "/images/products/wood-tray.jpg", categorySlug: "wooden", subcategorySlug: "home-decor-accessories", material: "Walnut Wood", finish: "Dark Stain Polished", moq: "30 pcs" },
  { name: "Tiered Cake Stand", sku: "SH-CSW-26-02", image: "/images/products/wood-cakestand.jpg", categorySlug: "wooden", subcategorySlug: "kitchenware-serveware", material: "Teak Wood", finish: "Smooth Gloss", moq: "15 pcs" },
  { name: "Minimalist Wooden Stool", sku: "SH-FURN-11-88", image: "/images/products/wood-stool.jpg", categorySlug: "wooden", subcategorySlug: "furniture-lifestyle", material: "Oak Wood", finish: "Natural Wax", moq: "10 pcs" },
  { name: "White Marble Soap Dispenser", sku: "SH-BATH-44-12", image: "/images/products/marble-dispenser.jpg", categorySlug: "marble", subcategorySlug: "marble-bathroom", material: "White Makrana Marble & Brass", finish: "High Gloss Polish", moq: "40 pcs" },
  { name: "Fluted Marble Tray", sku: "SH-MTR-44-33", image: "/images/products/marble-tray.jpg", categorySlug: "marble", subcategorySlug: "marble-kitchen", material: "Black Banswara Marble", finish: "Honed", moq: "25 pcs" },
  { name: "Marble Coaster Set (Set of 4)", sku: "SH-MCO-44-05", image: "/images/products/marble-coaster.jpg", categorySlug: "marble", subcategorySlug: "marble-home-kitchen", material: "Green Onyx Marble", finish: "Smooth Polish with Cork Base", moq: "100 sets" },
  { name: "Scalloped Marble Bowl", sku: "SH-MBL-44-19", image: "/images/products/marble-bowl.jpg", categorySlug: "marble", subcategorySlug: "marble-kitchen", material: "Pink Udaipur Marble", finish: "Matte", moq: "35 pcs" },
  { name: "Marble Toothbrush Holder", sku: "SH-BATH-44-88", image: "/images/products/marble-holder.jpg", categorySlug: "marble", subcategorySlug: "marble-bathroom", material: "White Makrana Marble", finish: "Textured Ribbed", moq: "50 pcs" },
];

const seedDB = async () => {
  await connectDB();

  await Category.deleteMany();
  await SubCategory.deleteMany();
  await Product.deleteMany();
  console.log("🗑️  Old data cleared");

  const insertedCategories = await Category.insertMany(categoriesData);
  console.log(`✅ ${insertedCategories.length} categories seeded`);

  const categoryMap = {};
  insertedCategories.forEach((cat) => {
    categoryMap[cat.slug] = cat._id;
  });

  const subCatsToInsert = subCategoriesData.map((sub) => ({
    name: sub.name,
    slug: sub.slug,
    category: categoryMap[sub.categorySlug],
    image: sub.image,
  }));
  const insertedSubCats = await SubCategory.insertMany(subCatsToInsert);
  console.log(`✅ ${insertedSubCats.length} subcategories seeded`);

  const subCatMap = {};
  insertedSubCats.forEach((sub) => {
    subCatMap[sub.slug] = sub._id;
  });

  const toSlug = (str) =>
    str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const productsToInsert = productsData.map((p) => ({
    name: p.name,
    slug: toSlug(p.name),
    sku: p.sku,
    image: p.image,
    category: categoryMap[p.categorySlug],
    subCategory: subCatMap[p.subcategorySlug],
    material: p.material,
    finish: p.finish,
    moq: p.moq,
  }));
  const insertedProducts = await Product.insertMany(productsToInsert);
  console.log(`✅ ${insertedProducts.length} products seeded`);

  console.log("🎉 Database seeded successfully!");
  process.exit(0);
};

seedDB().catch((err) => {
  console.error("❌ Seeder error:", err);
  process.exit(1);
});
