import { Router } from "express";
import {
  registerUserController,
  getAllUsersController,
  loginUserController,
} from "../controllers/authController.js";
const router = Router();

// Get All Users
router.get("/", getAllUsersController);

//Register User
router.post("/register", registerUserController);

//Login User
router.post("/login", loginUserController);

// //Get Single User By Id
// router.get("/:id", getUserByIdController);

// //Delete User By Id
// router.delete("/delete/:id", deleteUserByIdController);

// //Update User By Id
// router.patch("/update/:id", updateUserByIdController);

export default router;
