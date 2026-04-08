const Product = require("../models/Product");
const Category = require("../models/Category");

const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.subCategory) filter.subCategory = req.query.subCategory;
    if (req.query.search) filter.$text = { $search: req.query.search };

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("category", "title slug")
        .populate("subCategory", "name slug")
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: products.length,
      pagination: { total, page, pages: Math.ceil(total / limit), limit },
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("category", "title slug")
      .populate("subCategory", "name slug")
      .lean();

    if (!product) {
      const err = new Error("Product not found");
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "title slug")
      .populate("subCategory", "name slug")
      .lean();

    if (!product) {
      const err = new Error("Product not found");
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

const getProductsByCategorySlug = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const category = await Category.findOne({ slug: req.params.slug }).lean();
    if (!category) {
      const err = new Error(`Category not found: ${req.params.slug}`);
      err.statusCode = 404;
      return next(err);
    }

    const filter = { category: category._id };

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("subCategory", "name slug")
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      category: { title: category.title, slug: category.slug },
      pagination: { total, page, pages: Math.ceil(total / limit), limit },
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate("category", "title slug")
      .populate("subCategory", "name slug")
      .lean();

    if (!product) {
      const err = new Error("Product not found");
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      const err = new Error("Product not found");
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductBySlug,
  getProductsByCategorySlug,
  createProduct,
  updateProduct,
  deleteProduct,
};
