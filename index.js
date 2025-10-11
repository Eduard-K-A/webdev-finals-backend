import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

dotenv.config(); // load .env first

// ✅ create app FIRST before using it
const app = express();

app.use(express.json());
app.use(cors());

// ✅ connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// ✅ use routes AFTER app is created
app.use("/api/users", userRoutes);

// ✅ define simple test route
app.get("/", (req, res) => {
  res.send("Hello from Node.js + Express + MongoDB Atlas!");
});

// ✅ start server LAST
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
