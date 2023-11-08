const router = require('express').Router();
const { signin, createProfile,getUser } = require('../../controllers/users');
const multer = require('multer');
const upload = multer();

router.get('/getUser/:userId',getUser)
router.post('/signin', signin);
router.post('/signup', upload.single('image'), createProfile); 

module.exports = router;
