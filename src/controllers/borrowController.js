import { clientResponse } from "../middlewares/clientResponse";
import { insertBorrowBook } from "../models/borrowHistory/borrowHistoryModel";

const bookDueDays = 15;

export const insertNewBorrow = async (req, res, next) => {
  try {
    const { _id } = req.userInfo;

    let today = new Date();
    const dueDate = today.setDate(today.getDate() + bookDueDays);

    const obj = {
      ...req.body,
      dueDate,
      userId: _id,
    };

    const borrow = await insertBorrowBook(obj);
    borrow._id
      ? clientResponse({
          req,
          res,
          message: " The book has been borrowed successfully",
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
