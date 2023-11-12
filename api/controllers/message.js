const db = require('../database/index');

module.exports = {
    sendMessage: async (req, res) => {
        try {
            const {  content } = req.body;
            const {conversationId , senderId} =req.params
            // Create a new message
            const newMessage = await db.message.create({
                conversationId,
                content,
                senderId,
            });

            // Update the last message in the conversation
            const conversation = await db.conversation.findByPk(conversationId);
            if (conversation) {
                conversation.message_content = content; 
                await conversation.save();
            }

            return res.json({ message: newMessage });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getMessages: async (req, res) => {
        try {
            const { conversationId } = req.params;

            // Get all messages in the conversation
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
