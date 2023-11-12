const paypal = require("paypal-rest-sdk");

// PayPal Configuration (Same as before)
paypal.configure({
  mode: process.env.PAYPAL_MODE,
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

const makePayment = (req, res) => {
  const paymentDetails = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url:  "http://localhost:3000/success",
      cancel_url:  "http://localhost:3000/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Service",
              sku: "Service001",
              price: "10.00",
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "10.00", // Total service amount
        },
        description: "Service Description",
      },
    ],
  };
  paypal.payment.create(paymentDetails, (error, payment) => {
    if (error) {
      res.status(500).send(error);
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
};

module.exports = { makePayment };
