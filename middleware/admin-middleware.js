const adminMiddleware = (req, res, next) => {
  if (!req.userInfo) {
    return res.status(401).json({
      success: false,
      message: "Authentication required. Please login first.",
    });
  }

  // Check if user has admin role
  if (req.userInfo.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required.",
    });
  }

  next();
};

module.exports = adminMiddleware;
