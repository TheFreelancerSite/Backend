const express = require("express");
const { sendMessage, getMessages } = require("../controllers/message");
const router = express.Router();


router.post('/send/:conversationId/:senderId', sendMessage);
router.get('/conversation/:conversationId', getMessages);

module.exports = router;