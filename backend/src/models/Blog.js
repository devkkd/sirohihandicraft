const mongoose = require("mongoose");

const toSlug = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Blog description is required"],
      trim: true,
    },

    category: {
      type: String,
      trim: true,
      default: "",
    },

    image: {
      url: {
        type: String,
        default: "",
      },
      alt: {
        type: String,
        trim: true,
        default: "",
      },
    },

    content: {
      type: String,
      required: [true, "Blog content is required"],
    },

    author: {
      type: String,
      trim: true,
      default: "Sirohi Handicraft",
    },

    readTime: {
      type: String,
      trim: true,
      default: "5 min read",
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    metaTitle: {
      type: String,
      trim: true,
      default: "",
    },

    metaDescription: {
      type: String,
      trim: true,
      default: "",
    },

    schemaMarkup: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/*
 * Automatically create slug if slug is not provided.
 */
blogSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = toSlug(this.title);
  }

  next();
});

blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ category: 1 });
blogSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Blog", blogSchema);