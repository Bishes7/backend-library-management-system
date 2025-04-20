// Router to handle all authentication process
import express from "express";
import {
  activateUser,
  insertNewUser,
  loginUser,
} from "../controllers/authController.js";
import {
  LoginUserValidation,
  newUserValidation,
} from "../middlewares/validation/authValidation.js";

const router = express.Router();

// User Signup
router.post("/register", newUserValidation, insertNewUser);

export default router;

// Activating the users
router.post("/activate-user", activateUser);

// User Login
router.post("/login", LoginUserValidation, loginUser);
