import { Router } from "express";
import {
  createFlightsController,
  getAllFlightsController,
  getFlightByIdController,
  searchFlightsController,
  updateFlightByIdController,
} from "../controllers/flightsController.js";
const router = Router();

//Get All Flights
router.get("/", getAllFlightsController);

//Add Flight
router.post("/create", createFlightsController);

router.get("/search", searchFlightsController);

router.get("/:id", getFlightByIdController);

router.patch("/update/:id", updateFlightByIdController);

export default router;
