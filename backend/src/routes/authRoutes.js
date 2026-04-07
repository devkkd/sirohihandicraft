const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { login, refresh, logout, getMe } = require("../controllers/authController");
const protect = require("../middleware/protect");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: "Too many login attempts, try after 15 minutes" },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/login", loginLimiter, login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", protect, getMe);

module.exports = router;
