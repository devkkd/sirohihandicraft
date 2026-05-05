const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  family: 4, // force IPv4
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify SMTP connection on startup
transporter.verify((err) => {
  if (err) console.error("❌ SMTP connection failed:", err.message);
  else console.log("✅ SMTP ready — emails will be sent via", process.env.EMAIL_USER);
});

// Send to admin
const sendToAdmin = async ({ subject, html }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("Email credentials not set, skipping email.");
    return;
  }
  await transporter.sendMail({
    from: `"Sirohi Handicraft" <${process.env.EMAIL_FROM}>`,
    to: process.env.ADMIN_EMAIL,
    subject,
    html,
  });
};

// Send auto-reply to customer
const sendToCustomer = async ({ to, subject, html }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;
  await transporter.sendMail({
    from: `"Sirohi Handicraft" <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html,
  });
};

// ─── Product Inquiry (cart) ───────────────────────────────────────────────────
const sendProductInquiryEmail = async (inquiry) => {
  const productsHtml = inquiry.products
    ?.map((p) => `<tr>
      <td style="padding:8px;border-bottom:1px solid #f0ebe3;">${p.name}</td>
      <td style="padding:8px;border-bottom:1px solid #f0ebe3;font-family:monospace;">${p.sku}</td>
      <td style="padding:8px;border-bottom:1px solid #f0ebe3;">${p.moq}</td>
    </tr>`)
    .join("") || "";

  // Notify admin
  await sendToAdmin({
    subject: `New Product Inquiry from ${inquiry.name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#FFFDF9;padding:32px;border-radius:12px;">
        <h2 style="color:#3b2f1e;margin-bottom:4px;">New Product Inquiry</h2>
        <p style="color:#9e8f7e;font-size:12px;margin-bottom:24px;">${new Date().toLocaleString("en-IN")}</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <tr><td style="padding:8px 0;color:#9e8f7e;font-size:12px;width:120px;">NAME</td><td style="padding:8px 0;color:#3b2f1e;font-weight:600;">${inquiry.name}</td></tr>
          <tr><td style="padding:8px 0;color:#9e8f7e;font-size:12px;">EMAIL</td><td style="padding:8px 0;color:#3b2f1e;">${inquiry.email}</td></tr>
          <tr><td style="padding:8px 0;color:#9e8f7e;font-size:12px;">PHONE</td><td style="padding:8px 0;color:#3b2f1e;">${inquiry.phone}</td></tr>
          <tr><td style="padding:8px 0;color:#9e8f7e;font-size:12px;">COMPANY</td><td style="padding:8px 0;color:#3b2f1e;">${inquiry.company || "—"}</td></tr>
          ${inquiry.message ? `<tr><td style="padding:8px 0;color:#9e8f7e;font-size:12px;">MESSAGE</td><td style="padding:8px 0;color:#3b2f1e;">${inquiry.message}</td></tr>` : ""}
        </table>
        <h3 style="color:#3b2f1e;margin-bottom:12px;">Products (${inquiry.products?.length || 0})</h3>
        <table style="width:100%;border-collapse:collapse;background:#f5f0ea;border-radius:8px;overflow:hidden;">
          <thead><tr style="background:#645643;color:white;">
            <th style="padding:10px;text-align:left;font-size:11px;">PRODUCT</th>
            <th style="padding:10px;text-align:left;font-size:11px;">SKU</th>
            <th style="padding:10px;text-align:left;font-size:11px;">MOQ</th>
          </tr></thead>
          <tbody>${productsHtml}</tbody>
        </table>
      </div>
    `,
  });

  // Auto-reply to customer
  if (inquiry.email) {
    await sendToCustomer({
      to: inquiry.email,
      subject: `We've received your enquiry — Sirohi Handicraft`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#FFFDF9;padding:32px;border-radius:12px;">
          <h2 style="color:#3b2f1e;margin-bottom:8px;">Thank You, ${inquiry.name}</h2>
          <p style="color:#6b6154;font-size:14px;line-height:1.6;margin-bottom:16px;">
            We've received your product enquiry and our team will get back to you within <strong>24–48 business hours</strong>.
          </p>
          <p style="color:#6b6154;font-size:14px;line-height:1.6;margin-bottom:24px;">
            If you have any urgent questions, feel free to reach us directly at <a href="mailto:pankaj@sirohihandicraft.com" style="color:#645643;">pankaj@sirohihandicraft.com</a> or WhatsApp us at <strong>+91-9352606586</strong>.
          </p>
          <p style="color:#9e8f7e;font-size:12px;">— Team Sirohi Handicraft, Jaipur, Rajasthan</p>
        </div>
      `,
    });
  }
};

// ─── Customer Inquiry (contact / GetInTouch form) ─────────────────────────────
const sendCustomerInquiryEmail = async (inquiry) => {
  // Notify admin
  await sendToAdmin({
    subject: `New Customer Inquiry from ${inquiry.fullName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#FFFDF9;padding:32px;border-radius:12px;">
        <h2 style="color:#3b2f1e;margin-bottom:4px;">New Customer Inquiry</h2>
        <p style="color:#9e8f7e;font-size:12px;margin-bottom:24px;">${new Date().toLocaleString("en-IN")}</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <tr><td style="padding:8px 0;color:#9e8f7e;font-size:12px;width:140px;">FULL NAME</td><td style="padding:8px 0;color:#3b2f1e;font-weight:600;">${inquiry.fullName}</td></tr>
          <tr><td style="padding:8px 0;color:#9e8f7e;font-size:12px;">EMAIL</td><td style="padding:8px 0;color:#3b2f1e;">${inquiry.email}</td></tr>
          <tr><td style="padding:8px 0;color:#9e8f7e;font-size:12px;">PHONE</td><td style="padding:8px 0;color:#3b2f1e;">${inquiry.phone}</td></tr>
          <tr><td style="padding:8px 0;color:#9e8f7e;font-size:12px;">COMPANY</td><td style="padding:8px 0;color:#3b2f1e;">${inquiry.companyName || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#9e8f7e;font-size:12px;">COUNTRY</td><td style="padding:8px 0;color:#3b2f1e;">${inquiry.country || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#9e8f7e;font-size:12px;">CATEGORY</td><td style="padding:8px 0;color:#3b2f1e;">${inquiry.productCategory}</td></tr>
          ${inquiry.productsSKUs ? `<tr><td style="padding:8px 0;color:#9e8f7e;font-size:12px;">PRODUCTS/SKUs</td><td style="padding:8px 0;color:#3b2f1e;">${inquiry.productsSKUs}</td></tr>` : ""}
          ${inquiry.orderQuantity ? `<tr><td style="padding:8px 0;color:#9e8f7e;font-size:12px;">ORDER QTY</td><td style="padding:8px 0;color:#3b2f1e;">${inquiry.orderQuantity}</td></tr>` : ""}
          ${inquiry.additionalRequirements ? `<tr><td style="padding:8px 0;color:#9e8f7e;font-size:12px;">REQUIREMENTS</td><td style="padding:8px 0;color:#3b2f1e;">${inquiry.additionalRequirements}</td></tr>` : ""}
        </table>
      </div>
    `,
  });

  // Auto-reply to customer
  if (inquiry.email) {
    await sendToCustomer({
      to: inquiry.email,
      subject: `We've received your enquiry — Sirohi Handicraft`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#FFFDF9;padding:32px;border-radius:12px;">
          <h2 style="color:#3b2f1e;margin-bottom:8px;">Thank You, ${inquiry.fullName}</h2>
          <p style="color:#6b6154;font-size:14px;line-height:1.6;margin-bottom:16px;">
            We've received your enquiry for <strong>${inquiry.productCategory}</strong> and our team will get back to you within <strong>24–48 business hours</strong>.
          </p>
          <p style="color:#6b6154;font-size:14px;line-height:1.6;margin-bottom:24px;">
            For urgent queries, reach us at <a href="mailto:pankaj@sirohihandicraft.com" style="color:#645643;">pankaj@sirohihandicraft.com</a> or WhatsApp <strong>+91-9352606586</strong>.
          </p>
          <p style="color:#9e8f7e;font-size:12px;">— Team Sirohi Handicraft, Jaipur, Rajasthan</p>
        </div>
      `,
    });
  }
};

module.exports = { sendProductInquiryEmail, sendCustomerInquiryEmail };
