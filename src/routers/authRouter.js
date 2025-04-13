// Router to handle all authentication process
import express from "express";
const router = express.Router();

// User Registration
router.post("/register", (req, res, error) => {
  try {
    res.json({
      status: "success",
      messgae: "User Registered",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
