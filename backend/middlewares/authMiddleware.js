const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

exports.authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token tidak valid" });
    }
    req.user = decoded;
    next();
  });
};
