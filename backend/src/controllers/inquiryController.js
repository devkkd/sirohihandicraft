const Inquiry = require("../models/Inquiry");

// POST /api/inquiries  (public - cart se submit)
const createInquiry = async (req, res, next) => {
  try {
    const { name, email, phone, company, message, products } = req.body;

    if (!name || !email || !phone) {
      const err = new Error("Name, email and phone are required");
      err.statusCode = 400;
      return next(err);
    }

    if (!products?.length) {
      const err = new Error("At least one product is required");
      err.statusCode = 400;
      return next(err);
    }

    const inquiry = await Inquiry.create({ name, email, phone, company, message, products });
    res.status(201).json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
};

// GET /api/inquiries  (admin only)
const getInquiries = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const [inquiries, total] = await Promise.all([
      Inquiry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Inquiry.countDocuments(filter),
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

// GET /api/inquiries/:id  (admin only)
const getInquiryById = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id).lean();
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

// PUT /api/inquiries/:id/status  (admin only)
const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
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

// DELETE /api/inquiries/:id  (admin only)
const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      const err = new Error("Inquiry not found");
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, message: "Inquiry deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createInquiry, getInquiries, getInquiryById, updateStatus, deleteInquiry };
