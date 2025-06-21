import { getBorrowStatus } from "../models/books/bookModel.js";

export const getBorrowStatusStats = async (req, res, next) => {
  try {
    const result = await getBorrowStatus();
    res.json(result);
  } catch (error) {
    next(error);
  }
};
