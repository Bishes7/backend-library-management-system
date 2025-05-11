import express from "express";

import {
  deleteBookController,
  getAdminBooks,
  getAllBooks,
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
  upload.array("image", 2),
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

// Get method for Books for Users
router.get("/", getAllBooks);

// Get Method for Admins
router.get("/admin", userAuthMiddleware, adminMiddleware, getAdminBooks);

export default router;
