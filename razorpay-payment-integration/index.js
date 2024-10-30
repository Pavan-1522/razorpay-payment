// Load environment variables
require("dotenv").config();

const express = require("express");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(express.static("public"));

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Route to render the sample HTML page
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sample E-commerce with Razorpay</title>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </head>
    <body>
      <h1>Sample Product</h1>
      <p>Price: ₹1</p>
      <button id="orderNow">Order Now</button>

      <script>
        document.getElementById('orderNow').onclick = function(e) {
          fetch('/createOrder', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
              const options = {
                key: '${process.env.RAZORPAY_KEY_ID}', // Public key
                amount: data.amount,
                currency: "INR",
                name: "Elegets Electronics",
                description: "Payment for Sample Product",
                order_id: data.order_id,
                handler: function (response) {
                  // Redirect to confirmation page with payment details
                  window.location.href = '/success?payment_id=' + response.razorpay_payment_id;
                },
                prefill: {
                  name: "Pavan Kumar",
                  email: "email@example.com",
                  contact: "1234567890"
                },
                theme: {
                  color: "#3399cc"
                }
              };
              const rzp = new Razorpay(options);
              rzp.open();
            })
            .catch(console.error);
          e.preventDefault();
        };
      </script>
    </body>
    </html>
  `);
});

// API route to create an order
app.post("/createOrder", async (req, res) => {
  const options = {
    amount: 100, // Amount in paise (1 INR)
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
});

// Success page route
app.get("/success", (req, res) => {
  const paymentId = req.query.payment_id;
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
    </head>
    <body>
      <h1>Order Confirmed</h1>
      <p>Product: Sample Product</p>
      <p>Price: ₹1</p>
      <p>Payment ID: ${paymentId}</p>
      <p>Thank you for your purchase!</p>
    </body>
    </html>
  `);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
