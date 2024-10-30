const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

module.exports = async (req, res) => {
  const options = {
    amount: 100, // Amount in paise
    currency: "INR",
    receipt: "receipt#1",
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ order_id: order.id, amount: order.amount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
