const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const connectDB = require("./db");
const CatalogImage = require("../models/CatalogImage");

// 116 images ke liye - R2 pe upload karne ke baad ye script run karo
// Images naming: SH-CBW-26-01.jpg, SH-CBW-26-02.jpg ... SH-CBW-26-116.jpg

const BASE_URL = process.env.CLOUDFLARE_R2_PUBLIC_URL;

const seedCatalog = async () => {
  await connectDB();
  await CatalogImage.deleteMany();

  const images = [];
  // Example: 116 images with SKU pattern
  for (let i = 1; i <= 116; i++) {
    const sku = `SH-CBW-26-${String(i).padStart(2, "0")}`;
    images.push({
      url: `${BASE_URL}/catalog/${sku}.jpg`,
      sku,
      order: i,
    });
  }

  await CatalogImage.insertMany(images);
  console.log(`✅ ${images.length} catalog images seeded`);
  process.exit(0);
};

seedCatalog().catch((err) => {
  console.error(err);
  process.exit(1);
});
