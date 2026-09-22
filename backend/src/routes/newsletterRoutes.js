const express = require("express");
const router = express.Router();
const { subscribe, getSubscribers, unsubscribe } = require("../controllers/newsletterController");
const protect = require("../middleware/protect");

// Public routes
router.post("/subscribe", subscribe);
router.post("/unsubscribe", unsubscribe);

// Admin only — view all subscribers
router.get("/subscribers", protect, getSubscribers);

module.exports = router;
