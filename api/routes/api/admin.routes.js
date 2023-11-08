// admin.routes.js
const router = require('express').Router();
const { authenticateAdmin } = require('../../controllers/admin');
const multer = require('multer');



router.post('/admin/login', authenticateAdmin)


module.exports = router;
