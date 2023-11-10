const db = require('../database/index');
const { Op } = require('sequelize');

module.exports = {
    createConversation: async (req, res) => {
        try {
            const { userId } = req.params;
            console.log("im from conversation ", req.senderId);
            // Assuming you have the necessary data in req.body and req.userId
            const newConversation = new db.conversation({
                senderId: userId,
                receiverId: req.body.receiverId,
                message_content: req.body.message_content,
            });
            await newConversation.save();
            return res.json({ conversation: newConversation });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Controller function to get all conversations
    getConversations: async (req, res) => {
        try {
            // Assuming you want to get conversations for the authenticated user (req.userId)
            const conversations = await db.conversation.findAll({
                where: {
                    [Op.or]: [
                        { senderId: req.userId },
                        { receiverId: req.userId },
                    ],
                },
                include: [
                    { model: db.User, as: 'sender' },
                    { model: db.User, as: 'receiver' },
                ],
            });
            return res.json({ conversations });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getSingleConversation: async (req, res) => {
        try {
            const conversation = await db.conversation.findByPk(req.params.id, {
                include: [
                    { model: db.User, as: 'sender' },
                    { model: db.User, as: 'receiver' },
                ],
            });
            if (!conversation) {
                return res.status(404).json({ error: 'Conversation not found' });
            }
            return res.json({ conversation });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
