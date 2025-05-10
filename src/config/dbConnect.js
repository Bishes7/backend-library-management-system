import mongoose from "mongoose";
// net start MongoDB  - if stopped , cmd in bash

export const dbConnect = () => {
  if (!process.env.MONGO_URL) {
    throw new Error("Provide mongo_url connection string");
  }
  return mongoose.connect(process.env.MONGO_URL);
};

// export const dbConnect = async () => {
//   try {
//     if (!process.env.MONGO_URL) {
//       throw new Error("Provide mongo_url connection string");
//     }
//     const connectDB = await mongoose.connect(process.env.MONGO_URL);
//     connectDB && console.log("MongoDB Connected");
//   } catch (error) {
//     console.log(error);
//   }
// };
