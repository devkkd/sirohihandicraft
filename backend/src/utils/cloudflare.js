const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { randomUUID } = require("crypto");
const path = require("path");

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

const uploadToCloudflare = async (fileBuffer, mimetype, originalName) => {
  const ext = path.extname(originalName);
  const key = `uploads/${randomUUID()}${ext}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ContentType: mimetype,
    })
  );

  return `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${key}`;
};

const deleteFromCloudflare = async (imageUrl) => {
  // URL se key extract karo
  const key = imageUrl.replace(`${process.env.CLOUDFLARE_R2_PUBLIC_URL}/`, "");

  await s3.send(
    new DeleteObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: key,
    })
  );
};

module.exports = { uploadToCloudflare, deleteFromCloudflare };
