import { clientResponse } from "../middlewares/clientResponse.js";
import { createReview } from "../models/review/reviewModel.js";

export const insertNewReviews = async (req, res, next) => {
  try {
    const { _id, fName, lName } = req.userInfo;
    const reviewObj = {
      userId: _id,
      userName: `${fName} ${lName}`,
      ...req.body,
    };

    const result = await createReview(reviewObj);

    result._id
      ? clientResponse({ req, res, message: "Review added successfully" })
      : clientResponse({
          req,
          res,
          message: "Cant add review at this time",
          statusCode: 401,
        });
  } catch (error) {
    next(error);
  }
};
