// admin.routes.js
const router = require('express').Router();
const { authenticateAdmin, getUserById, getclients, getfreelancer, deleteUser, getAdmin, updateAdmin, logoutAdmin, search } = require('../../controllers/admin');
const { adminAuthenticated } = require('../../middlewares/Auth.middlewares')
const multer = require('multer');
const upload = multer();




router.post('/login', authenticateAdmin);
router.put('/update', adminAuthenticated, upload.single('image'), updateAdmin);
router.get('/user/:userId', getUserById)
router.get('/clients', adminAuthenticated, getclients)
router.get('/freelancers', adminAuthenticated, getfreelancer)
router.delete('/delete/:userId', deleteUser)
router.get('/profile/:adminId', adminAuthenticated, getAdmin)
router.post('/logout', adminAuthenticated, logoutAdmin)
router.post('/search', search)




module.exports = router;
