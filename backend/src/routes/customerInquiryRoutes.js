const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const { createCustomerInquiry, getCustomerInquiries, updateStatus, deleteCustomerInquiry } = require("../controllers/customerInquiryController");

router.post("/", createCustomerInquiry);
router.get("/", protect, getCustomerInquiries);
router.put("/:id/status", protect, updateStatus);
router.delete("/:id", protect, deleteCustomerInquiry);

module.exports = router;
