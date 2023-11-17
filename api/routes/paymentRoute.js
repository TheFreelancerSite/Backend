const { CreateIntent, config, updatingPaymentTable } = require('../controllers/payment');

const router = require('express').Router();


router.get("/config",config)
router.post("/intents",CreateIntent)
router.post('/updatingPaymentTable/:clientId/:freelancerId/:serviceId',updatingPaymentTable)

module.exports = router;
