// admin.routes.js
const router = require('express').Router();
const { authenticateAdmin, getUserById, getclients, getfreelancer } = require('../../controllers/admin');



router.post('/login', authenticateAdmin);
router.get('/user', getUserById)
router.get('/clients', getclients)
router.get('/freelancers', getfreelancer)



module.exports = router;
