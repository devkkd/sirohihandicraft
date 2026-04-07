const mongoose = require("mongoose");

const toSlug = (str) =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const categorySchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, lowercase: true, trim: true },
    title: { type: String, required: [true, "Category title is required"], trim: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

categorySchema.pre("save", function (next) {
  if (this.isModified("title") || !this.slug) this.slug = toSlug(this.title);
  next();
});

categorySchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.title) update.slug = toSlug(update.title);
  next();
});

module.exports = mongoose.model("Category", categorySchema);
