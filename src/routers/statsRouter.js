import express from "express";
import {
  DashboarsStatsController,
  getBorrowStatusStats,
} from "../controllers/borrowStatusController.js";
import {
  adminMiddleware,
  userAuthMiddleware,
} from "../middlewares/Validation/authMiddleware.js";
import { getRecentBooksController } from "../controllers/booksController.js";

const router = express.Router();

// route to get book status
router.get(
  "/borrow-status",
  userAuthMiddleware,
  adminMiddleware,
  getBorrowStatusStats
);

// route to get recent uploaded books chart
router.get(
  "/recent-books",
  userAuthMiddleware,
  adminMiddleware,
  getRecentBooksController
);

// routes for dashboard summary stats
router.get(
  "/dashboard-stats",
  userAuthMiddleware,
  adminMiddleware,
  DashboarsStatsController
);

export default router;
