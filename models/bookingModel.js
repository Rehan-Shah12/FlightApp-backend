import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "flights",
      required: true,
    },
    seatNumber: {
      type: String,
      required: true,
      unique: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    classes: {
      type: String,
      enum: ["business", "economy"],
      default: "economy",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("bookings", bookingSchema);
