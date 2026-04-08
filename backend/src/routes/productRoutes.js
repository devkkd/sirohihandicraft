const express = require("express");
const router = express.Router();
const { getProducts, getProductById, getProductBySlug, getProductsByCategorySlug, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const protect = require("../middleware/protect");

router.route("/").get(getProducts).post(protect, createProduct);
router.get("/category/:slug", getProductsByCategorySlug);
router.get("/slug/:slug", getProductBySlug);
router.route("/:id").get(getProductById).put(protect, updateProduct).delete(protect, deleteProduct);

module.exports = router;
