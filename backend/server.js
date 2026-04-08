require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const connectDB = require("./src/config/db");
const errorHandler = require("./src/middleware/errorHandler");

connectDB();

const app = express();

app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/upload", require("./src/routes/uploadRoutes"));
app.use("/api/categories", require("./src/routes/categoryRoutes"));
app.use("/api/subcategories", require("./src/routes/subCategoryRoutes"));
app.use("/api/products", require("./src/routes/productRoutes"));
app.use("/api/inquiries", require("./src/routes/inquiryRoutes"));
app.use("/api/customer-inquiries", require("./src/routes/customerInquiryRoutes"));
app.use("/api/bulk-upload", require("./src/routes/bulkUploadRoutes"));

app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

process.on("unhandledRejection", (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("✅ Process terminated");
  });
});
