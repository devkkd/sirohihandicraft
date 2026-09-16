const express = require("express");

const router = express.Router();

const {
  getBlogs,
  getAdminBlogs,
  getBlogBySlug,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const protect = require("../middleware/protect");
const upload = require("../middleware/upload");

/* =========================
   PUBLIC
========================= */

router.get("/", getBlogs);

router.get(
  "/slug/:slug",
  getBlogBySlug
);

/* =========================
   ADMIN
========================= */

router.get(
  "/admin/all",
  protect,
  getAdminBlogs
);

router.post(
  "/",
  protect,
  upload.single("image"),
  createBlog
);

router.get(
  "/id/:id",
  protect,
  getBlogById
);

router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateBlog
);

router.delete(
  "/:id",
  protect,
  deleteBlog
);

module.exports = router;