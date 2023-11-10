    // controllers/message.js
    const db = require('../database/index');

    module.exports = {
    // Controller function to send a new message
    sendMessage: async (req, res) => {
        try {
        const { conversationId, content, senderId } = req.body;
        
        // Assuming you have the necessary data in req.body
        const newMessage = await db.message.create({
            conversationId,
            content,
            senderId,
        });

        return res.json({ message: newMessage });
        } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Controller function to get all messages in a conversation
    getMessages: async (req, res) => {
        try {
        const { conversationId } = req.params;
        
        // Assuming you want to get messages for a specific conversation
        const messages = await db.message.findAll({
            where: { conversationId },
        });

        return res.json({ messages });
        } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    };
