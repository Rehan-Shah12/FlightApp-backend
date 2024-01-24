import Flight from "../models/flightModel.js";

export const getAllFlightsController = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
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
    // console.log("Filters: ", filters);

    // const query = {};

    // for (const key in filters) {
    //   query[key] = filters[key];
    // }

    // console.log("Keys: ", query);
    const flights = await Flight.find(filters);

    res.status(200).json({ flights });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error, Searching Flights Failed", error });
  }
};
