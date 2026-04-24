const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const { getCatalogImages, createCatalogImage, deleteCatalogImage } = require("../controllers/catalogController");

router.get("/", getCatalogImages);
router.post("/", protect, createCatalogImage);
router.delete("/:id", protect, deleteCatalogImage);

module.exports = router;
