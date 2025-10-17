// resetAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/unitedfood";
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const Admin = mongoose.model("Admin", adminSchema);

async function createAdmin() {
  try {
    // delete old admins
    await Admin.deleteMany({});

    // hash password
    const hashedPassword = await bcrypt.hash("12345", 10);

    // create new admin
    const admin = new Admin({
      username: "admin",
      password: hashedPassword,
    });

    await admin.save();
    console.log("✅ Admin created successfully with username: admin & password: 12345");
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  } finally {
    mongoose.disconnect();
  }
}

createAdmin();
