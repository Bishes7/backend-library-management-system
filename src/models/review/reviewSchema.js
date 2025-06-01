import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    reviewMessage: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      max: 5,
      min: 1,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    borrowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "myBorrows",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
