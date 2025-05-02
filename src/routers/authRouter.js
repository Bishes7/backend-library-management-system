// Router to handle all authentication process
import express from "express";
import {
  activateUser,
  insertNewUser,
  loginUser,
  logoutUser,
  passwordReset,
  updateNewPassword,
} from "../controllers/authController.js";
import {
  newUserValidation,
  loginValidation,
} from "../middlewares/validation/authValidation.js";
import {
  renewAccessJWT,
  userAuthMiddleware,
} from "../middlewares/Validation/authMiddleware.js";

const router = express.Router();

// User Signup
router.post("/register", newUserValidation, insertNewUser);

// Activating the users
router.post("/activate-user", activateUser);

// Login User
router.post("/login", loginValidation, loginUser);

// renew access JWT
router.get("/renew-jwt", renewAccessJWT);

// Log Out user
router.get("/logout", userAuthMiddleware, logoutUser);

// password reset
router.post("/psw-reset", passwordReset);

// Update Password
router.post("/update-password", updateNewPassword);

export default router;
