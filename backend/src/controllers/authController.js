const Admin = require("../models/Admin");
const { generateAccessToken, generateRefreshToken, setAuthCookies, clearAuthCookies } = require("../utils/token");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const err = new Error("Email and password are required");
      err.statusCode = 400;
      return next(err);
    }

    const admin = await Admin.findOne({ email }).select("+password +refreshToken");
    if (!admin || !(await admin.comparePassword(password))) {
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      return next(err);
    }

    const accessToken = generateAccessToken(admin._id);
    const refreshToken = generateRefreshToken(admin._id);

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });

    setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json({
      success: true,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      const err = new Error("No refresh token");
      err.statusCode = 401;
      return next(err);
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const admin = await Admin.findById(decoded.id).select("+refreshToken");

    if (!admin || admin.refreshToken !== token) {
      const err = new Error("Invalid refresh token");
      err.statusCode = 401;
      return next(err);
    }

    const newAccessToken = generateAccessToken(admin._id);
    const newRefreshToken = generateRefreshToken(admin._id);

    admin.refreshToken = newRefreshToken;
    await admin.save({ validateBeforeSave: false });

    setAuthCookies(res, newAccessToken, newRefreshToken);

    res.status(200).json({ success: true });
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      const err = new Error("Invalid or expired refresh token");
      err.statusCode = 401;
      return next(err);
    }
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      const admin = await Admin.findOne({ refreshToken: token }).select("+refreshToken");
      if (admin) {
        admin.refreshToken = null;
        await admin.save({ validateBeforeSave: false });
      }
    }
    clearAuthCookies(res);
    res.status(200).json({ success: true, message: "Logged out" });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res) => {
  res.status(200).json({ success: true, admin: req.admin });
};

module.exports = { login, refresh, logout, getMe };
