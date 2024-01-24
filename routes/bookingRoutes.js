import { Router } from "express";
import { createBookingController } from "../controllers/bookingController.js";

const router = Router();

router.post("/create", createBookingController);

export default router;
