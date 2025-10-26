import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRegister from './routes/register.route.js';
import User from './models/User.js';
import { initializeRoles } from './models/Role.js';


dotenv.config(); // load .env first

const app = express();

app.use(express.json());
app.use(cors());

//  connect to MongoDB and initialize roles
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("📦 MongoDB Connected");
    // Initialize roles after connection
    await initializeRoles();
  })
  .catch(err => console.log("❌ MongoDB Error:", err));

//  use routes AFTER app is created
// mount auth routes (e.g. POST /auth/register)
app.use("/auth", authRegister);

app.get("/", (req, res) => {
  res.send("API is running...");
});

//  define simple test route
app.get('/test-db', async (req, res) => {
  try {
    const users = await User.find(); // simple query
    res.json({ success: true, count: users.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default app;
