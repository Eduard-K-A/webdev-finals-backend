import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        user: { type: ObjectId, required: true, ref: "User" },
        room: { type: ObjectId, required: true, ref: "Room" },
        checkInDate: { type: Date, required: true, min: Date.now },
        checkOutDate: { type: Date, required: true, validate: (checkOutDate, checkInDate) => checkOutDate > checkInDate },
        totalGuests: { type: Number, required: true },
        totalPrice: { type: Number, required: true, min: 0 },
        status: { type: String, enum: ["Pending", "Confirmed", "Cancelled", "Completed"], default: "Pending" },
        bookedAt: { type: Date, default: Date.now },

    });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;

