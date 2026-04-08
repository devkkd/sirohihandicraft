const CustomerInquiry = require("../models/CustomerInquiry");

// POST /api/customer-inquiries  (public)
const createCustomerInquiry = async (req, res, next) => {
  try {
    const { fullName, email, phone } = req.body;
    if (!fullName || !email || !phone) {
      const err = new Error("Full name, email and phone are required");
      err.statusCode = 400;
      return next(err);
    }
    const inquiry = await CustomerInquiry.create(req.body);
    res.status(201).json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
};

// GET /api/customer-inquiries  (admin)
const getCustomerInquiries = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.category) filter.productCategory = req.query.category;

    const [inquiries, total] = await Promise.all([
      CustomerInquiry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      CustomerInquiry.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      pagination: { total, page, pages: Math.ceil(total / limit) },
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/customer-inquiries/:id/status  (admin)
const updateStatus = async (req, res, next) => {
  try {
    const inquiry = await CustomerInquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    ).lean();
    if (!inquiry) {
      const err = new Error("Inquiry not found");
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/customer-inquiries/:id  (admin)
const deleteCustomerInquiry = async (req, res, next) => {
  try {
    const inquiry = await CustomerInquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      const err = new Error("Inquiry not found");
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createCustomerInquiry, getCustomerInquiries, updateStatus, deleteCustomerInquiry };
