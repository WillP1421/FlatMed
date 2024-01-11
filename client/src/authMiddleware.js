// authMiddleware.js

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Replace with your secret key
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
}

module.exports = verifyToken;
