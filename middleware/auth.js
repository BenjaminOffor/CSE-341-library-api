// middleware/auth.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied: no token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied: token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // store decoded payload (usually { id, iat, exp }) on req.user
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    // token invalid or other error
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authenticateToken;
