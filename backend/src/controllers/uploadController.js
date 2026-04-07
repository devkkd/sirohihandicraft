const { uploadToCloudflare, deleteFromCloudflare } = require("../utils/cloudflare");

const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      const err = new Error("No file provided");
      err.statusCode = 400;
      return next(err);
    }

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
