import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import registerRoute from './routes/register.route.js';
import loginRoute from './routes/login.route.js';
import roomRoute from './routes/room.route.js';
import userRoute from './routes/user.route.js';
import bookingRoute from './routes/booking.route.js';
import User from './models/User.js';
import { initializeRoles } from './models/Role.js';


dotenv.config(); // load .env first

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({ //only accepts requests from this origin
  origin: ['http://localhost:5173', 'https://webdev-finals-frontend.vercel.app', 'https://final-project-10-webdevt.vercel.app'],
  credentials: true
}));

// Connect to MongoDB and initialize roles before starting server
const startServer = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('MONGODB_URI is not defined in environment. Please set it and restart.');
    process.exit(1);
  }

  try {
    // Recommended options
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected');
    // Initialize roles after connection
    await initializeRoles();

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose disconnected');
    });

    // Start Express server after successful DB connection
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
};

startServer();

//  mount auth routes
app.use("/auth", registerRoute);  // POST /auth/register
app.use("/auth", loginRoute);     // POST /auth/login
app.use("/api", roomRoute);       // /api/rooms
app.use("/api", userRoute);       // /api/users
app.use("/api", bookingRoute);    // /api/bookings

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



