import e from "express";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["Single", "Double", "Suite"], required: true },
    pricePerNight: { type: Number, required: true, min: 0 },
    maxPeople: { type: Number, required: true, min: 1 },
    amenities: { type: [ObjectId], ref: "Amenity", required: true },
    photos: { type: [String] },
    isAvailable: { type: Boolean, default: true },
    averageRating: { type: Number, min: 0, max: 5, default: 0 },

    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", userSchema);
export default Room;
      
