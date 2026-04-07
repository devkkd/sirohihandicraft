const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const protect = require("../middleware/protect");
const { uploadImage, deleteImage } = require("../controllers/uploadController");

router.post("/", protect, upload.single("image"), uploadImage);
router.delete("/:imageId", protect, deleteImage);

module.exports = router;
