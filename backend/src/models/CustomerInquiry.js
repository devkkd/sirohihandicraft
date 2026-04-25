const mongoose = require("mongoose");

const customerInquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    companyName: { type: String, trim: true, default: "" },
    email: { type: String, required: true, trim: true, lowercase: true },
    country: { type: String, trim: true, default: "" },
    phone: { type: String, required: true, trim: true },
    productCategory: { type: String, enum: ["Wooden", "Marble", "Terracotta", "Paper Mache"], default: "Wooden" },
    productsSKUs: { type: String, trim: true, default: "" },
    orderQuantity: { type: String, trim: true, default: "" },
    additionalRequirements: { type: String, trim: true, default: "" },
    status: { type: String, enum: ["new", "in-progress", "resolved"], default: "new" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomerInquiry", customerInquirySchema);
