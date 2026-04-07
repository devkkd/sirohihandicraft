const jwt = require("jsonwebtoken");

const generateAccessToken = (adminId) =>
  jwt.sign({ id: adminId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES,
  });

const generateRefreshToken = (adminId) =>
  jwt.sign({ id: adminId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES,
  });

const cookieOptions = (maxAgeMs) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: maxAgeMs,
});

const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, cookieOptions(15 * 60 * 1000));
  res.cookie("refreshToken", refreshToken, cookieOptions(7 * 24 * 60 * 60 * 1000));
};

const clearAuthCookies = (res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
};

module.exports = { generateAccessToken, generateRefreshToken, setAuthCookies, clearAuthCookies };
