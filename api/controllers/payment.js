const db = require("../database/index");
require("dotenv").config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


module.exports = {
    CreateIntent: async (req, res) => {
        // const { clientId, freelancerId, serviceId } = req.params;
        const { amount } = req.body;

        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount*100,
                currency: 'usd',    
                automatic_payment_methods: {
                    enabled: true
                }
            });

            res.json({ paymentIntent: paymentIntent.client_secret });
        } catch (e) {
            res.status(400).json({
                error: e.message,
            });
        }
    },
    updatingPaymentTable: async (req, res) => {
        const { clientId, freelancerId, serviceId } = req.params;
        const { amount } = req.body;
    
        try {
            const existingPayment = await db.payment.findOne({
                where: { clientId, freelancerId, serviceId },
            });
    
            if (existingPayment) {
                existingPayment.amount = amount;
                await existingPayment.save();
    
                res.status(200).json(existingPayment);
            } else {
                const newPayment = await db.payment.create({
                    clientId,
                    freelancerId,
                    serviceId,
                    amount,
                });
    
                res.status(201).json(newPayment);
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            console.error(error);
        }
    },
    
    config :async(req,res)=>{
        res.send({
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
          });
    }
}