import express from "express";

import {
  deleteBookController,
  getAdminBooks,
  getAllBooks,
  getBooksCategoryController,
  getSinglePublicBook,
  insertNewbook,
  updateBooks,
} from "../controllers/booksController.js";
import {
  adminMiddleware,
  userAuthMiddleware,
} from "../middlewares/Validation/authMiddleware.js";
import {
  newBookValidation,
  updateBookValidation,
} from "../middlewares/Validation/bookValidation.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

// Post Books
router.post(
  "/",
  userAuthMiddleware,
  adminMiddleware,
  upload.single("image"),
  newBookValidation,

  insertNewbook
);

// Update Books
router.put(
  "/",
  userAuthMiddleware,
  adminMiddleware,
  upload.single("image", 1),
  updateBookValidation,
  updateBooks
);

// Delete Books
router.delete(
  "/:_id",
  userAuthMiddleware,
  adminMiddleware,
  deleteBookController
);

// Get method for all Books for Users
router.get("/", getAllBooks); // ✅ No auth middleware like isUserAuth

// Public API for single Book
router.get("/public/:slug", getSinglePublicBook);

// Get Method for Admins
router.get("/admin", userAuthMiddleware, adminMiddleware, getAdminBooks);

// get book category chart stats
router.get(
  "/stats/categories",
  userAuthMiddleware,
  adminMiddleware,
  getBooksCategoryController
);

export default router;
