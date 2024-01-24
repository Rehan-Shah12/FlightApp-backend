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
    seatsBooked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "flights.seats",
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("bookings", bookingSchema);
