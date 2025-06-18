import { clientResponse } from "../middlewares/clientResponse.js";
import { updateBorrowsTable } from "../models/borrowHistory/borrowHistoryModel.js";
import {
  createReview,
  getReviews,
  updateReview,
} from "../models/review/reviewModel.js";

export const insertNewReviews = async (req, res, next) => {
  try {
    const { _id, fName, lName } = req.userInfo;
    const { borrowId } = req.body;
    const reviewObj = {
      userId: _id,
      userName: `${fName} ${lName}`,
      ...req.body,
    };

    const reviewTable = await createReview(reviewObj); // review table

    if (reviewTable?._id) {
      const reviewId = reviewTable._id;

      // update  borrowtable with reviewId
      const updatedBorrowTable = await updateBorrowsTable(
        { _id: borrowId },
        { reviewId }
      );

      if (updatedBorrowTable?._id) {
        return clientResponse({
          req,
          res,
          message: "Review added successfully",
        });
      }
      clientResponse({
        req,
        res,
        message: "Cant add review at this time",
        statusCode: 401,
      });
    }
  } catch (error) {
    next(error);
  }
};

// fetch all reviews from the database

export const getAllReviews = async (req, res, next) => {
  try {
    const filter = {};

    if (!req.userInfo || req?.userInfo?.role !== "admin") {
      filter.isApproved = true;
    }

    const payload = await getReviews(filter);

    clientResponse({ req, res, payload, message: "Here are the reviews" });
  } catch (error) {
    next(error);
  }
};

// update review controller
export const updateReviewStatus = async (req, res, next) => {
  try {
    const { _id, isApproved } = req.body;

    const result = await updateReview({ _id, isApproved });

    result?._id
      ? clientResponse({ req, res, message: "Review updated successfully " })
      : clientResponse({
          req,
          res,
          statusCode: 400,
          message: "Error updating review at this time",
        });
  } catch (error) {
    next(error);
  }
};
