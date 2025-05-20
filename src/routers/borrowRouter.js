import express from "express";
import { userAuthMiddleware } from "../middlewares/Validation/authMiddleware";
import { insertNewBorrow } from "../controllers/borrowController";

const router = express.Router();

// insert new borrow book
router.post("/", userAuthMiddleware, insertNewBorrow);

export default router;
