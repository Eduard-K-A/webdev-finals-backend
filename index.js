import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cloudinary from './config/cloudinary.config.js';

import registerRoute from './routes/register.route.js';
import loginRoute from './routes/login.route.js';
import uploadRoute from './routes/uploadRoom.route.js';
import roomRoute from './routes/room.route.js';
import User from './models/User.js';
import { initializeRoles } from './models/Role.js';


dotenv.config(); // load .env first

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({ //only accepts requests from this origin
  origin: ['http://localhost:5173', 'https://webdev-finals-frontend.vercel.app'],
  credentials: true
}));

//  connect to MongoDB and initialize roles
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB Connected");
    // Initialize roles after connection
    await initializeRoles();
  })
  .catch(err => console.log("MongoDB Error:", err));

//  mount auth routes
app.use("/auth", registerRoute);  // POST /auth/register
app.use("/auth", loginRoute);     // POST /auth/login
app.use("/api", uploadRoute);     // POST /api/upload
app.use("/api", roomRoute);       // /api/rooms

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



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


