const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const path = require('path');

const app = express();

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: 'rzp_live_1gv8M4ch5oxde7',      // Replace with your Razorpay LIVE key_id
  key_secret: '8FkWSyf0UeA5tFWmjzw1dcvz' // Replace with your Razorpay LIVE key_secret
});

app.post('/create-order', async (req, res) => {
  const { amount, currency, receipt } = req.body;
  try {
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
      payment_capture: 1
    });
    res.json({ order_id: order.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order', details: err });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));