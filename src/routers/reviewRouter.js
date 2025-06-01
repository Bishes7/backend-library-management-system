import express from "express";
import { userAuthMiddleware } from "../middlewares/Validation/authMiddleware.js";
import { insertNewReviews } from "../controllers/reviewController.js";
import { reviewValidation } from "../middlewares/Validation/reviewValidation.js";

const router = express.Router();

// insert new Review
router.post("/", userAuthMiddleware, reviewValidation, insertNewReviews);

export default router;
