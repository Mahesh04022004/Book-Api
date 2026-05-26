const jwt = require("jsonwebtoken");

const authmiddleware = (req, res, next) => {
  const auth = req.headers["authorization"];
  const token = auth && auth.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Invalid token or token expirers",
    });
  }
  try {
    const verifyJwt = jwt.verify(token, process.env.JWT_SECRET);
    req.userInfo = verifyJwt;
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "invalid token",
    });
  }
  next();
};

module.exports = authmiddleware;
