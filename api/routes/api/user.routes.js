const router = require('express').Router();
const UserController = require('../../controllers/users')



router.post("/signin" , UserController.signin)
router.post('/signup' , UserController.createProfile)