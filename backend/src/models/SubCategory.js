const mongoose = require("mongoose");

const toSlug = (str) =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "SubCategory name is required"], trim: true },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: [true, "Category reference is required"] },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

subCategorySchema.pre("save", function (next) {
  if (this.isModified("name") || !this.slug) this.slug = toSlug(this.name);
  next();
});

subCategorySchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.name) update.slug = toSlug(update.name);
  next();
});

subCategorySchema.index({ category: 1, slug: 1 });

module.exports = mongoose.model("SubCategory", subCategorySchema);
