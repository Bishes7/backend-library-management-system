import { clientResponse } from "../middlewares/clientResponse.js";
import { updateSelectedBooks } from "../models/books/bookModel.js";
import {
  getAllBorrowsData,
  getWeeklyBorrowStats,
  insertBorrowsBook,
  updateBorrowsTable,
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
    if (borrow.length) {
      borrow.map(async ({ bookId }) => {
        await updateSelectedBooks({ _id: bookId, expectedAvailable: dueDate });
      });
    }

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
    const { _id } = req.userInfo;
    const path = req.path;

    const admin = path === "/admin";

    const borrows = admin
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

// return borrowed books
export const returnBorrowedBooks = async (req, res, next) => {
  try {
    const { _id } = req.userInfo;

    // get the userID and borrow ID
    const filter = {
      _id: req.body._id,
      userId: _id,
    };
    const obj = {
      isReturned: true,
      returnedDate: Date.now(),
    };

    // update borrow table // returning the books

    const result = await updateBorrowsTable(filter, obj);
    if (result?._id) {
      // update book table : expectedAvailable : null

      const updateBook = await updateSelectedBooks({
        _id: result.bookId,
        expectedAvailable: null,
      });
      // ToDO : send email notification
      if (updateBook?._id) {
        return clientResponse({
          req,
          res,
          message: "Your book has been returned successfully",
        });
      }
    }

    clientResponse({
      req,
      res,
      message: "Unable to return the book at this time",
      statusCode: 400,
    });
  } catch (error) {
    next(error);
  }
};

// borrow charts controller
export const getWeeklyBorrowsStatsController = async (req, res, next) => {
  try {
    const stats = await getWeeklyBorrowStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
};
