const Razorpay = require("razorpay");
const express = require("express");
const app = express();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Middleware to serve static files from 'public' directory
app.use(express.static("public"));

// Render the main HTML content
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;
