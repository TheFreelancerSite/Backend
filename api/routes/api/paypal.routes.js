const express = require('express');
const {makePayment} = require("../../controllers/paypal-service");

const router = express.Router();

router.post('/make/payment', makePayment);

module.exports = router;
