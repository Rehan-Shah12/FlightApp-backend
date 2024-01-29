import { Router } from "express";
import { createBookingController } from "../controllers/bookingController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/create", requireSignIn, createBookingController);

export default router;
