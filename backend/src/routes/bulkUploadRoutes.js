const express = require("express");
const router = express.Router();
const multer = require("multer");
const protect = require("../middleware/protect");
const { bulkUploadProducts, downloadTemplate } = require("../controllers/bulkUploadController");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("spreadsheet") || file.mimetype.includes("excel") || file.originalname.endsWith(".xlsx") || file.originalname.endsWith(".xls")) {
      cb(null, true);
    } else {
      cb(new Error("Only Excel files allowed"), false);
    }
  },
});

router.get("/template", protect, downloadTemplate);
router.post("/products", protect, upload.single("file"), bulkUploadProducts);

// Multiple image upload - returns public URLs
const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files allowed"), false);
  },
});

const { uploadToCloudflare } = require("../utils/cloudflare");

router.post("/images", protect, imageUpload.array("images", 500), async (req, res, next) => {
  try {
    if (!req.files?.length) {
      return res.status(400).json({ success: false, message: "No images provided" });
    }

    const results = await Promise.allSettled(
      req.files.map((file) =>
        uploadToCloudflare(file.buffer, file.mimetype, file.originalname)
      )
    );

    const uploaded = [];
    const failed = [];

    results.forEach((r, i) => {
      if (r.status === "fulfilled") {
        uploaded.push({ name: req.files[i].originalname, url: r.value });
      } else {
        failed.push({ name: req.files[i].originalname, error: r.reason?.message });
      }
    });

    res.status(200).json({
      success: true,
      message: `${uploaded.length} uploaded, ${failed.length} failed`,
      uploaded,
      failed,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
