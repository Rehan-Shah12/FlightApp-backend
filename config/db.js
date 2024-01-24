import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database Connected ${conn.connection.host}`);
  } catch (error) {
    console.log("Database not connected ", error);
    process.exit(1);
  }
};

export default connectDB;
