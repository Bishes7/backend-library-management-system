// Controllers for CRUD operations on Books

import { clientResponse } from "../middlewares/clientResponse.js";
import {
  createNewBook,
  getAllAdminBooks,
  getBooks,
} from "../models/books/bookModel.js";

export const insertNewbook = async (req, res, next) => {
  try {
    const { fName, _id } = req.userInfo;

    const obj = {
      ...req.body,
      addedBy: { name: fName, adminId: _id },
      lastUpdateBy: { name: fName, adminId: _id },
    };
    // adding book query
    const book = await createNewBook(obj);
    book?._id
      ? clientResponse({
          req,
          res,
          message: "The book has been added successfully",
        })
      : clientResponse({
          req,
          res,
          message: "Error adding book as this time",
          statusCode: 401,
        });
  } catch (error) {
    next(error);
  }
};

// get all books for Users

export const getAllBooks = async (req, res, next) => {
  try {
    const books = await getBooks();
    clientResponse({
      req,
      res,
      message: "Here is the list of books",
      payload: books,
    });
    clientResponse({
      req,
      res,
      message: "Error loading available book as this time",
      statusCode: 401,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminBooks = async (req, res, next) => {
  try {
    const books = await getAllAdminBooks();
    clientResponse({
      req,
      res,
      message: "Here is the books for admins only",
      payload: books,
    });
  } catch (error) {
    next(error);
  }
};
