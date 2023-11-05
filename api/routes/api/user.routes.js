const router = require('express').Router();
const { signin, createProfile, logout, getUser } = require('../../controllers/users');
const multer = require('multer');
const upload = multer();

router.get('/getUser/:userId',getUser)
router.post('/signin', signin);
router.post('/signup', upload.single('image'), createProfile); 
router.post('/logout', logout);

module.exports = router;
