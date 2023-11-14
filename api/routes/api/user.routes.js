const router = require('express').Router();

const { signin, createProfile, getUser,updateProfile} = require('../../controllers/users');
const multer = require('multer');
const upload = multer();

router.get('/getUser/:userId',getUser)
router.post('/signin', signin);
router.post('/signup', upload.single('image'), createProfile); 
router.put('/update/:userId',upload.single('image'), updateProfile);



module.exports = router;
