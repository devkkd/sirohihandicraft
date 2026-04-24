require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI).then(async () => {
  const CatalogImage = require("./src/models/CatalogImage");
  const count = await CatalogImage.countDocuments();
  const sample = await CatalogImage.find().limit(3).lean();
  console.log("Total catalog images in DB:", count);
  console.log("Sample:", JSON.stringify(sample, null, 2));
  process.exit(0);
}).catch(e => { console.error(e.message); process.exit(1); });
