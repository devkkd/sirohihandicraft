const { uploadToCloudflare, deleteFromCloudflare } = require("../utils/cloudflare");

const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      const err = new Error("No file provided");
      err.statusCode = 400;
      return next(err);
    }

    console.log("Upload attempt:", req.file.originalname, req.file.size, "bytes");
    console.log("R2 config:", {
      accountId: process.env.CLOUDFLARE_R2_ACCOUNT_ID?.substring(0, 8) + "...",
      bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      publicUrl: process.env.CLOUDFLARE_R2_PUBLIC_URL,
    });

    const url = await uploadToCloudflare(
      req.file.buffer,
      req.file.mimetype,
      req.file.originalname
    );

    res.status(200).json({ success: true, url });
  } catch (error) {
    // Cloudflare actual error extract karo
    const cfMessage = error.response?.data?.errors?.[0]?.message;
    console.error("Cloudflare error:", error.response?.data || error.message);
    const err = new Error(cfMessage || error.message || "Upload failed");
    err.statusCode = error.response?.status || 500;
    next(err);
  }
};

const deleteImage = async (req, res, next) => {
  try {
    await deleteFromCloudflare(req.params.imageId);
    res.status(200).json({ success: true, message: "Image deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadImage, deleteImage };
