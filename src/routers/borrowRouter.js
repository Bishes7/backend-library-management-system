import express from "express";
import {
  adminMiddleware,
  userAuthMiddleware,
} from "../middlewares/Validation/authMiddleware.js";
import {
  getBorrowsBooks,
  getWeeklyBorrowsStatsController,
  getWeeklyUserBorrowStatsController,
  insertNewBorrow,
  returnBorrowedBooks,
} from "../controllers/borrowController.js";
import { borrowDataValidaton } from "../middlewares/Validation/borrowDataValidation.js";

const router = express.Router();

// insert new borrow book
router.post("/", userAuthMiddleware, borrowDataValidaton, insertNewBorrow);

// return all borrows for admin only
router.get("/admin", userAuthMiddleware, adminMiddleware, getBorrowsBooks);

// return borrow books for users only
router.get("/user", userAuthMiddleware, getBorrowsBooks);

// return the books back to the library
router.patch("/", userAuthMiddleware, returnBorrowedBooks);

// Route for borrow stats chart by month
router.get(
  "/stats/weekly",
  userAuthMiddleware,
  adminMiddleware,
  getWeeklyBorrowsStatsController
);

// // user weekly borrow stats
router.get(
  "/borrow-chart",
  userAuthMiddleware,
  getWeeklyUserBorrowStatsController
);
export default router;
