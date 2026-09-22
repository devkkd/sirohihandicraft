const NewsletterSubscriber = require("../models/NewsletterSubscriber");
const { sendToAdmin, sendToCustomer } = require("../utils/email");

// ─── POST /api/newsletter/subscribe ──────────────────────────────────────────
const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Please provide a valid email address." });
    }

    // Check for duplicate
    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) {
      // If previously unsubscribed, re-activate
      if (!existing.isActive) {
        existing.isActive = true;
        await existing.save();
        return res.status(200).json({ success: true, message: "Welcome back! You've been re-subscribed." });
      }
      return res.status(409).json({ success: false, message: "This email is already subscribed." });
    }

    await NewsletterSubscriber.create({ email });

    // Notify admin
    try {
      await sendToAdmin({
        subject: "New Newsletter Subscriber",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#FFFDF9;padding:32px;border-radius:12px;">
            <h2 style="color:#3b2f1e;margin-bottom:4px;">New Newsletter Subscriber</h2>
            <p style="color:#9e8f7e;font-size:12px;margin-bottom:24px;">${new Date().toLocaleString("en-IN")}</p>
            <p style="color:#6b6154;font-size:14px;">A new visitor has subscribed to the newsletter:</p>
            <p style="color:#3b2f1e;font-weight:600;font-size:16px;margin-top:8px;">${email}</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Admin newsletter notify failed:", emailErr.message);
    }

    // Welcome email to subscriber
    try {
      await sendToCustomer({
        to: email,
        subject: "Welcome to Sirohi Handicraft Newsletter 🎉",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#FFFDF9;padding:32px;border-radius:12px;">
            <h2 style="color:#3b2f1e;margin-bottom:8px;">You're in!</h2>
            <p style="color:#6b6154;font-size:14px;line-height:1.6;margin-bottom:16px;">
              Thank you for subscribing to the <strong>Sirohi Handicraft</strong> newsletter. You'll be the first to know about new collections, handcraft stories, and exclusive offers.
            </p>
            <p style="color:#6b6154;font-size:14px;line-height:1.6;margin-bottom:24px;">
              Explore our latest handcrafted products at <a href="https://sirohihandicraft.com" style="color:#615236;">sirohihandicraft.com</a>
            </p>
            <p style="color:#9e8f7e;font-size:12px;">— Team Sirohi Handicraft, Jaipur, Rajasthan</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Welcome email failed:", emailErr.message);
    }

    res.status(201).json({ success: true, message: "Successfully subscribed to the newsletter!" });
  } catch (err) {
    next(err);
  }
};

// ─── GET /api/newsletter/subscribers (admin only) ────────────────────────────
const getSubscribers = async (req, res, next) => {
  try {
    const subscribers = await NewsletterSubscriber.find({ isActive: true })
      .select("email subscribedAt")
      .sort({ subscribedAt: -1 });

    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (err) {
    next(err);
  }
};

// ─── DELETE /api/newsletter/unsubscribe (soft delete) ────────────────────────
const unsubscribe = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    const subscriber = await NewsletterSubscriber.findOne({ email });
    if (!subscriber) {
      return res.status(404).json({ success: false, message: "Email not found in our list." });
    }

    subscriber.isActive = false;
    await subscriber.save();

    res.status(200).json({ success: true, message: "You've been unsubscribed successfully." });
  } catch (err) {
    next(err);
  }
};

module.exports = { subscribe, getSubscribers, unsubscribe };
