require("dotenv").config();
const mongoose = require("mongoose");
const CatalogImage = require("./src/models/CatalogImage");

const BASE_URL = process.env.CLOUDFLARE_R2_PUBLIC_URL;

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await CatalogImage.deleteMany();

  const images = [];
  for (let i = 0; i <= 116; i++) {
    const name = String(i).padStart(2, "0"); // 00, 01, 02 ... 116
    images.push({
      url: `${BASE_URL}/${name}.jpg`,
      sku: name,
      order: i,
    });
  }

  await CatalogImage.insertMany(images);
  console.log(`✅ ${images.length} catalog images saved to DB`);
  console.log(`Sample URL: ${images[0].url}`);
  process.exit(0);
}).catch(e => { console.error(e.message); process.exit(1); });
