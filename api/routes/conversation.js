const express = require("express");
const { getConversations, createConversation, getSingleConversation, updateConversations } = require("../controllers/conversation");
const router = express.Router();



router.get("/:userId",getConversations)
router.post("/create/:userId/:receiverId",createConversation)
router.get("/single/:id",getSingleConversation)
// router.get("/:id",updateConversations)



module.exports = router;