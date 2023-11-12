const db = require('../database/index');
const { Op } = require('sequelize');

module.exports = {
    createConversation: async (req, res) => {
        try {
            const { userId ,receiverId} = req.params;
            

            const existingConversation = await db.conversation.findOne({
                where: {
                    [Op.or]: [
                        { senderId: userId, receiverId },
                        { senderId: receiverId, receiverId: userId },
                    ],
                },
            });

            if (existingConversation) {
                existingConversation.message_content = req.body.message_content;
                await existingConversation.save();

                return res.json({ conversation: existingConversation });
            }

            const newConversation = new db.conversation({
                senderId: userId,
                receiverId: receiverId,
                message_content: req.body.message_content,
            });
            await newConversation.save();

            return res.json({ conversation: newConversation });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // getConversations: async (req, res) => {
    //     try {
    //         const { userId } = req.body;
    //         const conversations = await db.User.findByPk(userId, {
    //             include: [
    //                 { model: db.User, as: 'sender', through: 'conversation' },
    //                 { model: db.User, as: 'receiver', through: 'conversation' },
    //             ],
    //         });
    
    //         if (!conversations) {
    //             return res.status(404).json({ error: 'User not found' });
    //         }
    
    //         return res.json({ conversations });
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ error: 'Internal Server Error' });
    //     }
    // },
    getConversations: async (req, res) => {
        try {
            const { userId } = req.params;
            const conversations = await db.conversation.findAll({
                where: {
                    [Op.or]: [
                        { senderId: userId },
                        { receiverId: userId },
                    ],
                },
            });
    
            return res.json({ conversations });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getSingleConversation: async (req, res) => {
        try {
            console.log(req.params.id)
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
