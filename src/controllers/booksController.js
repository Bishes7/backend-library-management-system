// Controllers for CRUD operations on Books

import { clientResponse } from "../middlewares/clientResponse.js";
import slugify from "slugify";
import {
  createNewBook,
  deleteSelectedBook,
  getAllAdminBooks,
  getBooks,
  updateSelectedBooks,
} from "../models/books/bookModel.js";

// Insert Books query
export const insertNewbook = async (req, res, next) => {
  try {
    const { fName, _id } = req.userInfo;
    const { path } = req.file;

    const obj = {
      ...req.body,
      slug: slugify(req.body.title, { lower: true }),
      addedBy: { name: fName, adminId: _id },
      lastUpdateBy: { name: fName, adminId: _id },
      imgUrl: path,
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
    if (error.message.includes("E11000 duplicate key")) {
      return clientResponse({
        req,
        res,
        message: "Duplicate data not allowed:" + JSON.stringify(error.keyValue),
        statusCode: 400,
      });
    }
    next(error);
  }
};

// Update Books
export const updateBooks = async (req, res, next) => {
  try {
    const { _id, fName } = req.userInfo;
    const obj = {
      ...req.body,
      lastUpdateBy: { name: fName, adminId: _id },
    };
    // updating book query
    const books = await updateSelectedBooks(obj);
    books?._id
      ? clientResponse({
          req,
          res,
          message: "Your book has been  updated successfully",
        })
      : clientResponse({
          req,
          res,
          message: "Unable to update book at this time",
          statusCode: 400,
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

// Delete Book Controller
export const deleteBookController = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const book = await deleteSelectedBook(_id);
    book?._id
      ? clientResponse({
          req,
          res,
          message: "Selected book has been deleted successfully",
        })
      : clientResponse({
          req,
          res,
          message: "Unable to delete the book at this time",
          statusCode: 400,
        });
  } catch (error) {
    next(error);
  }
};
