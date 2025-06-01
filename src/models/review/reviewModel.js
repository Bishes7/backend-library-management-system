import reviewSchema from "./reviewSchema.js";

// insert new review in the db table
export const createReview = (reviewobj) => {
  return reviewSchema(reviewobj).save();
};
