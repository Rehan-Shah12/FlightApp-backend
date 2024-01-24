import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  departureCity: {
    type: String,
    required: true,
    trim: true,
  },
  arrivalCity: {
    type: String,
    required: true,
    trim: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  planeType: {
    type: String,
    required: true,
    trim: true,
  },
  classes: {
    type: String,
    enum: ["business", "economy"],
    default: "economy",
    required: true,
  },

  seats: [
    {
      seatNumber: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["available", "booked"],
        default: "available",
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model("flights", flightSchema);
