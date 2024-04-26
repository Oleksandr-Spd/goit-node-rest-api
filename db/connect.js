import mongoose from "mongoose";

const { MONGODB_URL } = process.env;

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Database connection successful");
  } catch (error) {
    console.log(error);
  }
}
