import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("Provide mongo_url connection string");
    }

    const connectDB = await mongoose.connect(process.env.MONGO_URL);
    connectDB && console.log("✅ MongoDB Connected");
  } catch (error) {
    console.log("❌ MongoDB Connection Error:", error.message);
  }
};
