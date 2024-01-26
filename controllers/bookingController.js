import Booking from "../models/bookingModel.js";

export const createBookingController = async (req, res) => {
  try {
    const { user, flight, classes, seatNumber, totalPrice } = req.body;

    console.log("SeatNumber: ", seatNumber);
    const booking = new Booking({
      user,
      flight,
      classes,
      seatNumber,
      totalPrice,
    });
    await booking.save();
    res.status(200).json(booking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error, Creating Booking Failed", error });
  }
};
