import mongoose from "mongoose";

const amenitySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        icon: { type: String }
    });

const Amenity = mongoose.model("Amenity", amenitySchema);
export default Amenity;