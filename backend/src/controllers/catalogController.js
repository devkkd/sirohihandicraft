const CatalogImage = require("../models/CatalogImage");

// GET /api/catalog?page=1&limit=15
const getCatalogImages = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * limit;

    const [images, total] = await Promise.all([
      CatalogImage.find().sort({ order: 1, createdAt: 1 }).skip(skip).limit(limit).lean(),
      CatalogImage.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      pagination: { total, page, pages: Math.ceil(total / limit), limit },
      data: images,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/catalog (admin)
const createCatalogImage = async (req, res, next) => {
  try {
    const image = await CatalogImage.create(req.body);
    res.status(201).json({ success: true, data: image });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/catalog/:id (admin)
const deleteCatalogImage = async (req, res, next) => {
  try {
    const image = await CatalogImage.findByIdAndDelete(req.params.id);
    if (!image) {
      const err = new Error("Image not found");
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCatalogImages, createCatalogImage, deleteCatalogImage };
