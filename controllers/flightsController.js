import Flight from "../models/flightModel.js";

export const getAllFlightsController = async (req, res) => {
  try {
    const { page = 1, pageSize = 3 } = req.query;

    const totalFlightsCount = await Flight.countDocuments();

    const flights = await Flight.find()
      .limit(parseInt(pageSize))
      .skip((parseInt(page) - 1) * parseInt(pageSize));

    const totalPages = Math.ceil(totalFlightsCount / pageSize);

    res.status(200).json({
      flights,
      totalPages,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error, Getting All Flights Failed", error });
  }
};

export const createFlightsController = async (req, res) => {
  try {
    const flightsData = Array.isArray(req.body) ? req.body : [req.body];

    const createdFlights = [];

    for (const flightData of flightsData) {
      const {
        flightNumber,
        departureCity,
        arrivalCity,
        departureTime,
        arrivalTime,
        planeType,
        seats,
      } = flightData;

      const flight = new Flight({
        flightNumber,
        departureCity,
        arrivalCity,
        departureTime,
        arrivalTime,
        planeType,
        seats,
      });

      await flight.save();

      createdFlights.push(flight);
    }

    res.status(200).json(createdFlights);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error, Adding Flights Failed", error });
  }
};

export const searchFlightsController = async (req, res) => {
  try {
    const filters = req.query;

    const regexFilters = {};
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        regexFilters[key] = { $regex: new RegExp(value, "i") };
      }
    }

    const flights = await Flight.find(regexFilters);

    if (!flights) {
      return res.status(400).json({ message: "Flight does not exist" });
    }

    res.status(200).json({ flights });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error, Searching Flights Failed", error });
  }
};

export const getFlightByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const flight = await Flight.findById(id);
    if (!flight) {
      return res.status(404).json({ message: "Flight Not Found" });
    }
    res.status(200).json(flight);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error, Getting Flight By Id Failed", error });
  }
};

export const updateFlightByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const { seatNumber } = req.body;

    const response = await Flight.findOneAndUpdate(
      { _id: id, "seats.seatNumber": seatNumber },
      { $set: { "seats.$.status": "booked" } },
      { new: true }
    );

    if (!response) {
      return res.status(404).json({ message: "Flight or Seat Not Found" });
    }

    const seatToUpdate = response.seats.find(
      (seat) => seat.seatNumber === seatNumber
    );

    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error, Updating Flight By Id Failed", error });
  }
};
