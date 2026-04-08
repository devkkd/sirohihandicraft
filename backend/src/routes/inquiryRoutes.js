const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const { createInquiry, getInquiries, getInquiryById, updateStatus, deleteInquiry } = require("../controllers/inquiryController");

router.post("/", createInquiry);                           // public
router.get("/", protect, getInquiries);                    // admin
router.get("/:id", protect, getInquiryById);               // admin
router.put("/:id/status", protect, updateStatus);          // admin
router.delete("/:id", protect, deleteInquiry);             // admin

module.exports = router;
