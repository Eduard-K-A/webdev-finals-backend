import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        user: { type: ObjectId, required: true, ref: "User" },
        room: { type: ObjectId, required: true, ref: "Room" },
        booking: { type: ObjectId, required: true, ref: "Booking" },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, maxLength: 500 },
        postedAt: { type: Date, default: Date.now },
    });

const Review = mongoose.model("Review", reviewSchema);
export default Review;