import mongoose from "mongoose";

// Room schema for storing room data
const roomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["Single", "Double", "Suite", "Family", "Exclusive"], required: true },
    pricePerNight: { type: Number, required: true, min: 0 },
    rating:{type: Number, default:0},
    maxPeople: { type: Number, required: true, min: 1 },
    // amenities reference (optional) — store ObjectId references to Amenity documents
    amenities: [{ type: String}],
    // photos stored as objects with url and publicId returned from Cloudinary
    photos: [
      {
        url: { type: String, required: true },
        publicId: { type: String },
        originalName: { type: String }
      }
    ],
    isAvailable: { type: Boolean, default: true },
    averageRating: { type: Number, min: 0, max: 5, default: 0 },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
      
