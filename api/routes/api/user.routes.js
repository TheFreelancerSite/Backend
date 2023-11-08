const router = require('express').Router();
const passport = require("passport")

const { signin, createProfile, getUser,updateUserProfile} = require('../../controllers/users');
const multer = require('multer');
const upload = multer();

router.get('/getUser/:userId',getUser)
router.post('/signin', signin);
router.post('/signup', upload.single('image'), createProfile); 
router.put('/updateUser/:userId', upload.single('image'),updateUserProfile)


router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/signin' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:5173');
  });

module.exports = router;
