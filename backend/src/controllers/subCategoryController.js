const SubCategory = require("../models/SubCategory");

const getSubCategories = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    const subCategories = await SubCategory.find(filter)
      .populate("category", "title slug")
      .lean();

    res.status(200).json({ success: true, count: subCategories.length, data: subCategories });
  } catch (error) {
    next(error);
  }
};

const getSubCategoryById = async (req, res, next) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id)
      .populate("category", "title slug")
      .lean();

    if (!subCategory) {
      const err = new Error("SubCategory not found");
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, data: subCategory });
  } catch (error) {
    next(error);
  }
};

const createSubCategory = async (req, res, next) => {
  try {
    const subCategory = await SubCategory.create(req.body);
    res.status(201).json({ success: true, data: subCategory });
  } catch (error) {
    next(error);
  }
};

const updateSubCategory = async (req, res, next) => {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).lean();

    if (!subCategory) {
      const err = new Error("SubCategory not found");
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, data: subCategory });
  } catch (error) {
    next(error);
  }
};

const deleteSubCategory = async (req, res, next) => {
  try {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subCategory) {
      const err = new Error("SubCategory not found");
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, message: "SubCategory deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSubCategories, getSubCategoryById, createSubCategory, updateSubCategory, deleteSubCategory };
