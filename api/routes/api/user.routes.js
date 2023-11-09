const router = require('express').Router();

const { signin, createProfile, getUser,updateUserProfile} = require('../../controllers/users');
const multer = require('multer');
const upload = multer();

router.get('/getUser/:userId',getUser)
router.post('/signin', signin);
router.post('/signup', upload.single('image'), createProfile); 
router.put('/updateUser/:userId', upload.single('image'),updateUserProfile)




module.exports = router;
