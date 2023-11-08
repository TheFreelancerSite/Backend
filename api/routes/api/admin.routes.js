// admin.routes.js
const router = require('express').Router();
const { authenticateAdmin } = require('../../controllers/admin');
const multer = require('multer');
const { adminAuthenticated } = require('../../middlewares/Auth.middlewares');


router.post('/login', adminAuthenticated, (req, res) => {
    // Handle the successful login here, and you can access the authenticated admin via req.admin
    res.json({ message: 'Authentication successful', admin: req.admin });
  });

module.exports = router;
