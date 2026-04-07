const Category = require("../models/Category");

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().lean();
    res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id).lean();
    if (!category) {
      const err = new Error("Category not found");
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};


const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,      
        runValidators: true, 
      }
    ).lean();

    if (!category) {
      const err = new Error("Category not found");
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      const err = new Error("Category not found");
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
