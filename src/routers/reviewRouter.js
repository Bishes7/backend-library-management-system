import express from "express";
import {
  adminMiddleware,
  userAuthMiddleware,
} from "../middlewares/Validation/authMiddleware.js";
import {
  deleteReviewController,
  getAllReviews,
  insertNewReviews,
  updateReviewStatus,
} from "../controllers/reviewController.js";
import { reviewValidation } from "../middlewares/Validation/reviewValidation.js";
import { blockDemoUser } from "../middlewares/blockDemoUser.js";

const router = express.Router();

// insert new Review
router.post("/", userAuthMiddleware, reviewValidation, insertNewReviews);

// get all reviews fir public
router.get("/", getAllReviews);

// get all reviews for admin
router.get("/admin", userAuthMiddleware, adminMiddleware, getAllReviews);

// update review status
router.patch(
  "/admin",
  userAuthMiddleware,
  adminMiddleware,
  blockDemoUser,
  updateReviewStatus
);

router.delete(
  "/:id",
  userAuthMiddleware,
  adminMiddleware,
  blockDemoUser,
  deleteReviewController
);

export default router;
