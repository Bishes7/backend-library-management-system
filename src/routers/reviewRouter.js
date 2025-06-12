import express from "express";
import { userAuthMiddleware } from "../middlewares/Validation/authMiddleware.js";
import {
  getAllReviews,
  insertNewReviews,
} from "../controllers/reviewController.js";
import { reviewValidation } from "../middlewares/Validation/reviewValidation.js";

const router = express.Router();

// insert new Review
router.post("/", userAuthMiddleware, reviewValidation, insertNewReviews);

// get all reviews fir public
router.get("/", userAuthMiddleware, getAllReviews);

// get all reviews for admin
router.get("/admin", userAuthMiddleware, getAllReviews);

export default router;
