import { Router } from "express";
import {
  createFlightsController,
  getAllFlightsController,
  searchFlightsController,
} from "../controllers/flightsController.js";

const router = Router();

//Get All Flights
router.get("/", getAllFlightsController);

//Add Flight
router.post("/create", createFlightsController);

router.get("/search", searchFlightsController);

export default router;
