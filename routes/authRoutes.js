import { Router } from "express";
import {
  registerUserController,
  getAllUsersController,
  loginUserController,
  getUserByIdController,
} from "../controllers/authController.js";
const router = Router();

// Get All Users
router.get("/", getAllUsersController);

//Register User
router.post("/register", registerUserController);

//Login User
router.post("/login", loginUserController);

//Get Single User By Id
router.get("/:id", getUserByIdController);

export default router;
