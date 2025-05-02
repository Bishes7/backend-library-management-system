import express from "express";
import { insertNewbook } from "../controllers/booksController.js";
import {
  adminMiddleware,
  userAuthMiddleware,
} from "../middlewares/Validation/authMiddleware.js";
const router = express.Router();

export default router;

// Get Books
// router.get("/", userAuthMiddleware, adminMiddleware, insertNewbook);

// Post Books
router.post("/", userAuthMiddleware, adminMiddleware, insertNewbook);
