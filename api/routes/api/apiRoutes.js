const router = require('express').Router();
const userRoutes = require('./user.routes');
const serviceRoutes = require('./Service.routes')



router.use('/user', userRoutes)
router.use('/service', serviceRoutes)


module.exports = router;