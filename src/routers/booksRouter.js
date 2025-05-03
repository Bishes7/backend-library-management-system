import express from "express";
import {
  getAdminBooks,
  getAllBooks,
  insertNewbook,
} from "../controllers/booksController.js";
import {
  adminMiddleware,
  userAuthMiddleware,
} from "../middlewares/Validation/authMiddleware.js";
import { newBookValidation } from "../middlewares/Validation/bookValidation.js";
const router = express.Router();

// Get Books
// router.get("/", userAuthMiddleware, adminMiddleware, insertNewbook);

// Post Books
router.post(
  "/",
  userAuthMiddleware,
  adminMiddleware,
  newBookValidation,
  insertNewbook
);

// Get method for Books for Users
router.get("/", getAllBooks);

// Get Method for Admins
router.get("/admin", userAuthMiddleware, adminMiddleware, getAdminBooks);

export default router;
