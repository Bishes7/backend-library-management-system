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

// update review status
export const updateReview = ({ _id, ...rest }) => {
  return reviewSchema.findByIdAndUpdate(_id, rest);
};

// delete reviews
export const deleteReview = (id) => {
  return reviewSchema.findByIdAndDelete(id);
};
