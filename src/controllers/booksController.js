// Controllers for CRUD operations on Books

import { clientResponse } from "../middlewares/clientResponse.js";
import { createNewBook } from "../models/books/bookModel.js";

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
