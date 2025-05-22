import { clientResponse } from "../middlewares/clientResponse.js";
import {
  getAllBorrowsData,
  insertBorrowsBook,
} from "../models/borrowHistory/borrowHistoryModel.js";

const bookDueDays = 15;

export const insertNewBorrow = async (req, res, next) => {
  try {
    const { _id } = req.userInfo;

    let today = new Date();
    const dueDate = today.setDate(today.getDate() + bookDueDays);

    req.body = req.body.map((book) => {
      return {
        ...book,
        userId: _id,
        dueDate,
      };
    });

    const borrow = await insertBorrowsBook(req.body);
    Array.isArray(borrow)
      ? clientResponse({
          req,
          res,
          message: " The book has been borrowed successfully",
          payload: borrow,
        })
      : clientResponse({
          req,
          res,
          message: "Unable to borrow the book at this time",
          statusCode: 401,
        });
  } catch (error) {
    next(error);
  }
};

// get borrows books
export const getBorrowsBooks = async (req, res, next) => {
  try {
    const { _id, role } = req.userInfo;

    const isAdmin = role === "admin";

    const borrows = isAdmin
      ? await getAllBorrowsData()
      : await getAllBorrowsData({ userId: _id });
    clientResponse({
      req,
      res,
      message: "Here is the list of the borrowed books",
      payload: borrows,
    });
  } catch (error) {
    next(error);
  }
};
