const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/authenticateToken');
// Middleware to check for admin role
function isAdmin(req, res, next) {
  const user = req.user;
  if (user && user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied: Admins only.' });
}

// Example protected admin route
router.get('/admin-data', authenticateToken, isAdmin, (req, res) => {
  res.json({ message: 'This is admin-only data.' });
});

module.exports = router;
