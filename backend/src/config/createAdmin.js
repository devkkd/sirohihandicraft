const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const mongoose = require("mongoose");
const connectDB = require("./db");
const Admin = require("../models/Admin");

const createAdmin = async () => {
  await connectDB();

  const existing = await Admin.findOne({ email: "admin@sirohihandicraft.com" });
  if (existing) {
    console.log("Admin already exists");
    process.exit(0);
  }

  await Admin.create({
    name: "Super Admin",
    email: "admin@sirohihandicraft.com",
    password: "Admin@12345",
  });

  console.log("Admin created successfully");
  console.log("Email: admin@sirohihandicraft.com");
  console.log("Password: Admin@12345");
  console.log("Change password after first login!");
  process.exit(0);
};

createAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
