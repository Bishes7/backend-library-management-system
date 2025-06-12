import reviewSchema from "./reviewSchema.js";

// insert new review in the db table
export const createReview = (reviewobj) => {
  return reviewSchema(reviewobj).save();
};

// get reviews from the database
export const getReviews = (filter) => {
  // return reviewSchema.find(filter).sort({ updatedAt: -1 });
  return reviewSchema
    .find(filter)
    .populate({
      path: "bookId",
      select: "title slug imgUrl",
    })
    .sort({ updatedAt: -1 });
};
