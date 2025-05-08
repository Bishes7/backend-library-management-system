import express from "express";
import multer from "multer";
import path from "path";

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
const router = express.Router();

// Multer setup
// const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filePath = uniqueSuffix + "-" + file.originalname;

    cb(null, filePath);
  },
});

// filter to allow images only
const fileFilter = (req, file, cb) => {
  const allowedFiletypes = /jpeg|jpg|png|webp/;
  const extName = path.extname(file.originalname).toLowerCase();
  const isAllowedExt = allowedFiletypes.test(extName);
  const mimeType = allowedFiletypes.test(file.mimeType);

  if (isAllowedExt && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only jpeg|jpg|png|webp are allowed "), false);
  }
};

const upload = multer({ storage: storage, fileFilter });

// Post Books
router.post(
  "/",
  userAuthMiddleware,
  adminMiddleware,
  upload.array("image", 2),
  newBookValidation,

  insertNewbook
);

// Update Books
router.put(
  "/",
  userAuthMiddleware,
  adminMiddleware,
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
