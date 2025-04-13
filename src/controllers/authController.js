import { createNewUser } from "../models/user/userModel.js";

export const insertNewUser = async (req, res, error) => {
  try {
    const users = await createNewUser(req.body);
    res.json({
      status: "success",
      messgae: "User Registered",
      users,
    });
  } catch (error) {
    next(error);
  }
};
