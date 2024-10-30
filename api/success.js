module.exports = (req, res) => {
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
  };
  