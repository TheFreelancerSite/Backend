// admin.routes.js
const router = require('express').Router();
const { authenticateAdmin, getUserById, getclients, getfreelancer, deleteUser, getAdmin, updateAdmin } = require('../../controllers/admin');
const { adminAuthenticated } = require('../../middlewares/Auth.middlewares')
const multer = require('multer');
const upload = multer();




router.post('/login', authenticateAdmin);
router.put('/update', adminAuthenticated, upload.single('image'), updateAdmin);
router.get('/user', adminAuthenticated, getUserById)
router.get('/clients', adminAuthenticated, getclients)
router.get('/freelancers', adminAuthenticated, getfreelancer)
router.delete('/delete/:userid', adminAuthenticated, deleteUser)
router.get('/profile', adminAuthenticated, getAdmin)



module.exports = router;
