const Razorpay = require("razorpay");
const express = require("express");
const app = express();

// Middleware for serving static files
app.use(express.static("public"));

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
          fetch('/api/createOrder', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
              const options = {
                key: '${process.env.RAZORPAY_KEY_ID}',
                amount: data.amount,
                currency: "INR",
                name: "Elegets Electronics",
                description: "Payment for Sample Product",
                order_id: data.order_id,
                handler: function (response) {
                  window.location.href = '/api/success?payment_id=' + response.razorpay_payment_id;
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

module.exports = app;
