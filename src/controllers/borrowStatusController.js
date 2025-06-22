import {
  dashboardBookStats,
  getBorrowStatus,
} from "../models/books/bookModel.js";
import { dashboardBorrowStats } from "../models/borrowHistory/borrowHistoryModel.js";
import { dashboardUserStats } from "../models/user/userModel.js";

export const getBorrowStatusStats = async (req, res, next) => {
  try {
    const result = await getBorrowStatus();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const DashboarsStatsController = async (req, res, next) => {
  try {
    const totalBooks = await dashboardBookStats();
    const totalUsers = await dashboardUserStats();
    const totalBorrows = await dashboardBorrowStats();
    res.json({ totalBooks, totalUsers, totalBorrows });
  } catch (error) {
    next(error);
  }
};
