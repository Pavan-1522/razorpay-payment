// api/createOrder.js
const Razorpay = require("razorpay");

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Initialize Razorpay instance with environment variables
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  // Options for creating the order
  const options = {
    amount: 100, // Amount in paise (1 INR)
    currency: "INR",
    receipt: "receipt#1",
    payment_capture: 1, // Auto capture
  };

  try {
    // Create the order with Razorpay
    const order = await razorpay.orders.create(options);

    // Send back the order details as JSON
    return res.status(200).json({ order_id: order.id, amount: order.amount });
  } catch (error) {
    // Log error to the console for debugging
    console.error("Razorpay order creation error:", error);

    // Send a JSON error response to the client
    return res.status(500).json({ error: "Failed to create order. Please try again later." });
  }
}
