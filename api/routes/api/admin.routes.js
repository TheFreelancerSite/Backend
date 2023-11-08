// admin.routes.js
const router = require('express').Router();
const { authenticateAdmin } = require('../../controllers/admin');
const multer = require('multer');
const { adminAuthenticated } = require('../../middlewares/Auth.middlewares');


router.post('/admin/login',authenticateAdmin)
router.use(adminAuthenticated); 


module.exports = router;
