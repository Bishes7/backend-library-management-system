import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    bookTitle: {
      type: String,
      required: true,
    },
    bookSlug: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      required: true,
    },

    isReturned: {
      type: Boolean,
      default: false,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    returnedDate: {
      type: Date,
      default: null,
    },

    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Review",
    },
  },
  { timestamps: true }
);

export default mongoose.model("myBorrows", borrowSchema);
