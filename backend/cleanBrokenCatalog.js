require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");
const CatalogImage = require("./src/models/CatalogImage");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const all = await CatalogImage.find().lean();
  console.log(`Checking ${all.length} images...`);

  const broken = [];
  const valid = [];

  // Check in batches of 10 to avoid overwhelming
  for (let i = 0; i < all.length; i += 10) {
    const batch = all.slice(i, i + 10);
    const results = await Promise.allSettled(
      batch.map((img) => axios.head(img.url, { timeout: 5000 }))
    );
    results.forEach((r, j) => {
      if (r.status === "rejected" || r.value?.status === 404) {
        broken.push(batch[j]._id);
        console.log(`❌ Broken: ${batch[j].url}`);
      } else {
        valid.push(batch[j].sku);
      }
    });
    process.stdout.write(`Progress: ${Math.min(i + 10, all.length)}/${all.length}\r`);
  }

  console.log(`\n✅ Valid: ${valid.length} | ❌ Broken: ${broken.length}`);

  if (broken.length > 0) {
    await CatalogImage.deleteMany({ _id: { $in: broken } });
    console.log(`🗑️  Deleted ${broken.length} broken entries from DB`);
  }

  process.exit(0);
}).catch(e => { console.error(e.message); process.exit(1); });
