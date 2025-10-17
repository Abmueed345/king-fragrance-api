const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');

// Routes
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

// Models
const Order = require('./models/Order'); // ✅ FIX: Order model import

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Static frontend files
app.use(express.static('public')); // ✅ admin.html serve karne ke liye

// MongoDB connection
const mongoURI = 'mongodb://127.0.0.1:27017/unitedfood';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected!'))
.catch(err => console.error('❌ MongoDB connection error:', err));

/* -------------------
   Extra Order APIs
------------------- */

// Save order (public)
app.post('/api/orders', async (req, res) => {
  try {
    const { name, phone, address, items, total } = req.body;

    if (!name || !phone || !address || !items || !total) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const newOrder = new Order({ name, phone, address, items, total });
    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: 'Order placed successfully!',
      orderId: savedOrder._id
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Update Order (Confirm)
app.put("/api/orders/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "Confirmed" },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Order
app.delete("/api/orders/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------
   Frontend fallback
------------------- */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
