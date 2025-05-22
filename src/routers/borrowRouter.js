import express from "express";
import {
  adminMiddleware,
  userAuthMiddleware,
} from "../middlewares/Validation/authMiddleware.js";
import {
  getBorrowsBooks,
  insertNewBorrow,
} from "../controllers/borrowController.js";
import { borrowDataValidaton } from "../middlewares/Validation/borrowDataValidation.js";

const router = express.Router();

// insert new borrow book
router.post("/", userAuthMiddleware, borrowDataValidaton, insertNewBorrow);

// return all borrows for admin only
router.get("/admin", userAuthMiddleware, adminMiddleware, getBorrowsBooks);

// return borrow books for users only
router.get("/user", userAuthMiddleware, getBorrowsBooks);

export default router;
