// Router to handle all authentication process
import express from "express";
import { insertNewUser } from "../controllers/authController.js";

const router = express.Router();

// User Registration
router.post("/register", insertNewUser);

export default router;
