import express from "express";
import { userAuthMiddleware } from "../middlewares/Validation/authMiddleware.js";
import { insertNewReviews } from "../controllers/reviewController.js";

const router = express.Router();

// insert new Review
router.post("/", userAuthMiddleware, insertNewReviews);

export default router;
