import mongoose, { Mongoose } from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive", // will be either active or inactive
    },
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },

    imageList: [{ type: String, default: [] }],

    isbn: {
      type: Number,
      unique: true,
      index: 1,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: false,
    },
    averageRating: {
      type: Number,
    },

    description: {
      type: String,
      required: true,
    },
    expectedAvailable: {
      type: Date,
      default: null,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },

    addedBy: {
      name: {
        type: String,
      },
      adminId: {
        type: mongoose.Types.ObjectId,
      },
    },
    lastUpdateBy: {
      name: {
        type: String,
      },
      adminId: {
        type: mongoose.Types.ObjectId,
      },
    },
  },
  { timestamps: true }
);

// export book schema
export default mongoose.model("Book", bookSchema);
