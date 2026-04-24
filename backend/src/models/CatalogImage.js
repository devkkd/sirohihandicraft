const mongoose = require("mongoose");

const catalogImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    sku: { type: String, trim: true, default: "" },
    title: { type: String, trim: true, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

catalogImageSchema.index({ order: 1 });

module.exports = mongoose.model("CatalogImage", catalogImageSchema);
