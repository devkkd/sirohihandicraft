const express = require("express");
const router = express.Router();
const { getSubCategories, getSubCategoryById, createSubCategory, updateSubCategory, deleteSubCategory } = require("../controllers/subCategoryController");
const protect = require("../middleware/protect");

router.route("/").get(getSubCategories).post(protect, createSubCategory);
router.route("/:id").get(getSubCategoryById).put(protect, updateSubCategory).delete(protect, deleteSubCategory);

module.exports = router;
