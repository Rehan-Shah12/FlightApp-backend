import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import flightRoutes from "./routes/flightRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/flight", flightRoutes);
app.use("/api/v1/booking", bookingRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server Listning on port ${PORT}`);
});
