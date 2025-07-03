import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "inactive",
    },
    lName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    password: {
      type: String,
      required: true,
    },
    refreshJWT: {
      type: String,
    },
    profilePic: {
      type: String,
      default: "", // or "/default-profile.png" if you want
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
