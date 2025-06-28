import express from "express";
import {
  adminMiddleware,
  deleteUserController,
  getAllUsersController,
  getWeeklyUserStatsController,
  userAuthMiddleware,
} from "../middlewares/Validation/authMiddleware.js";
import { clientResponse } from "../middlewares/clientResponse.js";

const router = express.Router();

router.get("/profile", userAuthMiddleware, async (req, res) => {
  const user = req.userInfo;
  user.password = undefined;
  user.refreshJWT = undefined;
  user.__v = undefined;

  // returns to the frontend
  return clientResponse({
    req,
    res,
    message: "User Profile",
    payload: user,
  });
});

// get weekly user stats
router.get(
  "/stats/weekly",
  userAuthMiddleware,
  adminMiddleware,
  getWeeklyUserStatsController
);

// get all users
router.get(
  "/all-users",
  userAuthMiddleware,
  adminMiddleware,
  getAllUsersController
);
export default router;

// Delete Selected User
router.delete(
  "/:id",
  userAuthMiddleware,
  adminMiddleware,
  deleteUserController
);
