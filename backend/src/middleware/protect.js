const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      const err = new Error("Not authorized");
      err.statusCode = 401;
      return next(err);
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      const err = new Error("Admin not found");
      err.statusCode = 401;
      return next(err);
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      const err = new Error("Invalid or expired token");
      err.statusCode = 401;
      return next(err);
    }
    next(error);
  }
};

module.exports = protect;
