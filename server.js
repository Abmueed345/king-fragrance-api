

// // // server.js - Updated Version

// // require('dotenv').config(); // ✅ Add this at the very top

// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const bodyParser = require('body-parser');
// // const path = require('path');
// // const methodOverride = require('method-override');

// // // Routes
// // const adminRoutes = require("./routes/adminRoutes");
// // const productRoutes = require('./routes/productRoutes');
// // const orderRoutes = require('./routes/orderRoutes');
// // const authRoutes = require('./routes/authRoutes');

// // // Models
// // const Order = require('./models/Order');

// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(bodyParser.json());
// // app.use(methodOverride('_method'));

// // // API Routes
// // app.use('/api/auth', authRoutes);
// // app.use('/api/admin', adminRoutes);
// // app.use('/api/products', productRoutes);
// // app.use('/api/orders', orderRoutes);

// // // Static frontend files
// // app.use(express.static('public'));

// // // ==================== MONGODB ATLAS CONNECTION ====================
// // // ✅ ONLY USE ENVIRONMENT VARIABLE - NO HARDCODED URI!
// // const MONGODB_URI = process.env.MONGO_URI;

// // if (!MONGODB_URI) {
// //   console.error('❌ MONGO_URI environment variable is not set!');
// //   process.exit(1);
// // }

// // mongoose.connect(MONGODB_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // })
// // .then(() => {
// //   console.log('✅ MongoDB Atlas Connected Successfully!');
// //   console.log(`📊 Database: King Fragrance`);
// // })
// // .catch((err) => {
// //   console.error('❌ MongoDB Atlas Connection Error:', err.message);
// //   process.exit(1);
// // });

// // // ==================== ORDER ROUTES ====================

// // // Save order (public)
// // app.post('/api/orders', async (req, res) => {
// //   try {
// //     const { name, phone, address, items, total, status } = req.body;

// //     if (!name || !phone || !address || !items || !total) {
// //       return res.status(400).json({ message: 'Please provide all required fields.' });
// //     }

// //     const newOrder = new Order({ 
// //       name, 
// //       phone, 
// //       address, 
// //       items, 
// //       total,
// //       status: status || 'Pending'
// //     });
// //     const savedOrder = await newOrder.save();

// //     res.status(201).json({
// //       message: 'Order placed successfully!',
// //       orderId: savedOrder._id
// //     });
// //   } catch (error) {
// //     console.error('Error placing order:', error);
// //     res.status(500).json({ message: 'Server error. Please try again later.' });
// //   }
// // });

// // // Get all orders
// // app.get('/api/orders', async (req, res) => {
// //   try {
// //     const orders = await Order.find().sort({ createdAt: -1 });
// //     res.status(200).json({ success: true, orders });
// //   } catch (error) {
// //     console.error("Error fetching orders:", error);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });

// // // Get single order
// // app.get('/api/orders/:id', async (req, res) => {
// //   try {
// //     const order = await Order.findById(req.params.id);
// //     if (!order) {
// //       return res.status(404).json({ message: "Order not found" });
// //     }
// //     res.status(200).json({ success: true, order });
// //   } catch (error) {
// //     console.error("Error fetching order:", error);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });

// // // Update Order (Confirm/Preparing)
// // app.put("/api/orders/:id", async (req, res) => {
// //   try {
// //     const updatedOrder = await Order.findByIdAndUpdate(
// //       req.params.id,
// //       { status: req.body.status || "Preparing" },
// //       { new: true }
// //     );
// //     if (!updatedOrder) {
// //       return res.status(404).json({ message: "Order not found" });
// //     }
// //     res.json(updatedOrder);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // Delete Order
// // app.delete("/api/orders/:id", async (req, res) => {
// //   try {
// //     const deletedOrder = await Order.findByIdAndDelete(req.params.id);
// //     if (!deletedOrder) {
// //       return res.status(404).json({ message: "Order not found" });
// //     }
// //     res.json({ message: "Order deleted successfully" });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // ==================== FRONTEND FALLBACK ====================
// // app.get('*', (req, res) => {
// //   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// // });

// // // ==================== START SERVER ====================
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running on http://localhost:${PORT}`);
// //   console.log(`📍 API Endpoints:`);
// //   console.log(`   GET  /api/orders`);
// //   console.log(`   POST /api/orders`);
// //   console.log(`   PUT  /api/orders/:id`);
// //   console.log(`   DELETE /api/orders/:id`);
// //   console.log(`   GET  /api/products`);
// //   console.log(`   POST /api/products`);
// //   console.log(`   GET  /api/auth`);
// //   console.log(`   GET  /api/admin`);
// // });

// // // ==================== ERROR HANDLING ====================
// // process.on('unhandledRejection', (err) => {
// //   console.error('❌ Unhandled Rejection:', err);
// //   process.exit(1);
// // });

// // process.on('SIGTERM', () => {
// //   console.log('👋 SIGTERM received. Shutting down gracefully...');
// //   mongoose.connection.close(() => {
// //     console.log('💾 MongoDB connection closed');
// //     process.exit(0);
// //   });
// // });


// // server.js - Complete Updated Version with File Upload ✅

// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const path = require('path');
// const methodOverride = require('method-override');
// const multer = require('multer'); // ✅ NEW: File upload
// const fs = require('fs'); // ✅ NEW: File system

// // Routes
// const adminRoutes = require("./routes/adminRoutes");
// const productRoutes = require('./routes/productRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// const authRoutes = require('./routes/authRoutes');

// // Models
// const Order = require('./models/Order');

// const app = express();

// // ==================== FILE UPLOAD CONFIGURATION ✅ NEW ====================
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = 'public/uploads/products/';
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({ 
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files are allowed!'), false);
//     }
//   }
// });

// // ==================== MIDDLEWARE ====================
// app.use(cors());
// app.use(bodyParser.json({ limit: '10mb' })); // ✅ Increased limit for images
// app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
// app.use(methodOverride('_method'));

// // Serve static files (including uploads)
// app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
// app.use(express.static('public'));

// // ==================== API ROUTES ====================
// // Auth Routes
// app.use('/api/auth', authRoutes);

// // Admin Routes
// app.use('/api/admin', adminRoutes);

// // Product Routes
// app.use('/api/products', productRoutes);

// // Order Routes
// app.use('/api/orders', orderRoutes);

// // ==================== NEW FILE UPLOAD ROUTE ✅ ====================
// app.post('/api/upload', upload.single('image'), (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ 
//         error: 'No file uploaded or invalid file type. Only images (JPG, PNG, etc.) allowed.' 
//       });
//     }
    
//     const imageUrl = `/uploads/products/${req.file.filename}`;
    
//     res.status(200).json({ 
//       success: true,
//       url: imageUrl,
//       filename: req.file.filename,
//       size: req.file.size,
//       message: 'Image uploaded successfully!'
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ 
//       error: 'Image upload failed. Please try again.' 
//     });
//   }
// });

// // ==================== MONGODB ATLAS CONNECTION ====================
// const MONGODB_URI = process.env.MONGO_URI;

// if (!MONGODB_URI) {
//   console.error('❌ MONGO_URI environment variable is not set!');
//   process.exit(1);
// }

// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('✅ MongoDB Atlas Connected Successfully!');
//   console.log(`📊 Database: King Fragrance`);
// })
// .catch((err) => {
//   console.error('❌ MongoDB Atlas Connection Error:', err.message);
//   process.exit(1);
// });

// // ==================== ORDER ROUTES (Keep existing) ====================
// app.post('/api/orders', async (req, res) => {
//   try {
//     const { name, phone, address, items, total, status } = req.body;

//     if (!name || !phone || !address || !items || !total) {
//       return res.status(400).json({ message: 'Please provide all required fields.' });
//     }

//     const newOrder = new Order({ 
//       name, 
//       phone, 
//       address, 
//       items, 
//       total,
//       status: status || 'Pending'
//     });
//     const savedOrder = await newOrder.save();

//     res.status(201).json({
//       message: 'Order placed successfully!',
//       orderId: savedOrder._id
//     });
//   } catch (error) {
//     console.error('Error placing order:', error);
//     res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// });

// app.get('/api/orders', async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, orders });
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// app.get('/api/orders/:id', async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     res.status(200).json({ success: true, order });
//   } catch (error) {
//     console.error("Error fetching order:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// app.put("/api/orders/:id", async (req, res) => {
//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status: req.body.status || "Preparing" },
//       { new: true }
//     );
//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     res.json(updatedOrder);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.delete("/api/orders/:id", async (req, res) => {
//   try {
//     const deletedOrder = await Order.findByIdAndDelete(req.params.id);
//     if (!deletedOrder) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     res.json({ message: "Order deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ==================== FRONTEND FALLBACK ====================
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // ==================== START SERVER ====================
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📍 API Endpoints:`);
//   console.log(`   📁 POST /api/upload          ← NEW File Upload`);
//   console.log(`   🛒 GET/POST /api/orders`);
//   console.log(`   ✅ PUT  /api/orders/:id`);
//   console.log(`   🗑️  DELETE /api/orders/:id`);
//   console.log(`   💎 GET/POST /api/products`);
//   console.log(`   🔐 GET  /api/auth`);
//   console.log(`   👑 GET  /api/admin`);
//   console.log(`📁 Upload folder: public/uploads/products/`);
// });

// // ==================== ERROR HANDLING ====================
// process.on('unhandledRejection', (err) => {
//   console.error('❌ Unhandled Rejection:', err);
//   process.exit(1);
// });

// process.on('SIGTERM', () => {
//   console.log('👋 SIGTERM received. Shutting down gracefully...');
//   mongoose.connection.close(() => {
//     console.log('💾 MongoDB connection closed');
//     process.exit(0);
//   });
// });


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const multer = require('multer');
const fs = require('fs');

// Routes
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

// Models
const Order = require('./models/Order');

const app = express();

// ==================== FILE UPLOAD CONFIGURATION (PERMANENT STORAGE) ✅ ====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'public', 'uploads', 'products');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `product-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed! (JPG, PNG, WebP)'), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: { 
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter
});

// ==================== MIDDLEWARE ====================
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000'], // Add your frontend URLs
  credentials: true
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(methodOverride('_method'));

// ==================== SERVE STATIC FILES (CRITICAL) ✅ ====================
// 1. First serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
// 2. Then serve public folder
app.use(express.static(path.join(__dirname, 'public')));

// ==================== API ROUTES ====================
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// ==================== SECURE FILE UPLOAD ROUTE (WITH AUTH) ✅ ====================
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No image file uploaded. Please select JPG, PNG or WebP image.' 
      });
    }

    // Full public URL (works on both localhost & production)
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.get('host');
    const imageUrl = `${protocol}://${host}/uploads/products/${req.file.filename}`;
    
    console.log(`✅ Image uploaded: ${req.file.filename} → ${imageUrl}`);
    
    res.status(200).json({ 
      success: true,
      url: imageUrl,           // Full URL for frontend
      filename: req.file.filename,
      size: (req.file.size / 1024 / 1024).toFixed(2) + ' MB',
      message: 'Image uploaded successfully! 🖼️'
    });
  } catch (error) {
    console.error('❌ Upload error:', error.message);
    res.status(500).json({ 
      success: false,
      error: 'Image upload failed. Please try again.' 
    });
  }
});

// ==================== IMAGE DELETE ROUTE (OPTIONAL) ✅ ====================
app.delete('/api/upload/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'public', 'uploads', 'products', filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ success: true, message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ success: false, error: 'Image not found' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, error: 'Delete failed' });
  }
});

// ==================== ORDER ROUTES (Keep existing) ====================
app.post('/api/orders', async (req, res) => {
  try {
    const { name, phone, address, items, total, status } = req.body;

    if (!name || !phone || !address || !items || !total) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const newOrder = new Order({ 
      name, 
      phone, 
      address, 
      items, 
      total,
      status: status || 'Pending'
    });
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

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.put("/api/orders/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status || "Preparing" },
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

// ==================== MONGODB ATLAS CONNECTION ====================
const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGO_URI environment variable is not set!');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Atlas Connected Successfully!');
  console.log(`📊 Database: King Fragrance`);
})
.catch((err) => {
  console.error('❌ MongoDB Atlas Connection Error:', err.message);
  process.exit(1);
});

// ==================== FRONTEND FALLBACK ====================
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Upload folder: ${path.join(__dirname, 'public/uploads/products/')}`);
  console.log(`🖼️  Test upload: POST http://localhost:${PORT}/api/upload`);
  console.log(`📂 Images served: http://localhost:${PORT}/uploads/products/`);
});

// ==================== ERROR HANDLING ====================
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  mongoose.connection.close(() => {
    console.log('💾 MongoDB connection closed');
    process.exit(0);
  });
});