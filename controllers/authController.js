import User from "../models/userModel.js";
import { hashPassword } from "../helper/authHelper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

export const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length < 1) {
      return res.json({ message: "No User Avaliable", data: users });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Server Error, Getting All Users Failed",
      error: error.message,
    });
  }
};

//Add User
export const registerUserController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const secretPass = await hashPassword(password);
    const user = new User({ name, email, phone, password: secretPass });

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Server Error, Registering User Failed",
      error: error.message,
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    console.log("Resquest Body: ", req.body);
    let user;

    if (validator.isEmail(identifier)) {
      user = await User.findOne({ email: identifier });
    } else {
      user = await User.findOne({ phone: identifier });
    }

    console.log("User", user);
    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({ token, userId: user._id, message: "Logged In Succesfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server Error, Login User Failed",
      error: error.message,
    });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error, Getting User By Id Failed", error });
  }
};
