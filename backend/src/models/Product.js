const mongoose = require("mongoose");

const toSlug = (str) =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Product name is required"], trim: true },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    sku: { type: String, required: [true, "SKU is required"], unique: true, trim: true },
    description: { type: String, trim: true, default: "" },
    thumbnail: { type: String, default: "" },
    gallery: { type: [String], default: [] },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    material: { type: String, trim: true, default: "" },
    finish: { type: String, trim: true, default: "" },
    moq: { type: String, trim: true, default: "100 pcs" },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  if (this.isModified("name") || !this.slug) this.slug = toSlug(this.name);
  next();
});

productSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.name) update.slug = toSlug(update.name);
  next();
});

productSchema.index({ category: 1, subCategory: 1 });
productSchema.index({ name: "text" });

module.exports = mongoose.model("Product", productSchema);
