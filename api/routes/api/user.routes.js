const router = require('express').Router();

const { signin, createProfile, getUser,updateProfile,banUserById,unbanUserById} = require('../../controllers/users');
const multer = require('multer');
const upload = multer();

router.get('/getUser/:userId',getUser)
router.post('/signin', signin);
router.post('/signup', upload.single('image'), createProfile); 
router.put('/update/:userId',upload.single('image'), updateProfile);

router.put('/ban/:userId', banUserById);
router.put('/unban/:userId', unbanUserById);


module.exports = router;
