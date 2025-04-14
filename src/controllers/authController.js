import { createNewUser } from "../models/user/userModel.js";
import { encryptPasword } from "../utils/bcrypt.js";

export const insertNewUser = async (req, res, next) => {
  try {
    // receive user data
    const { password } = req.body;
    // encrypt user password
    req.body.password = encryptPasword(password);
    // insert users into the db
    const users = await createNewUser(req.body);
    // send an unique activation link to their mail
    if (users?._id) {
      res.json({
        status: "success",
        message: "Account has been created",
      });
      return;
    }

    res.json({
      status: "error",
      messgae: "Unable to create an account",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "Email already exists, Please try new email";
      error.statusCode = 200;
    }
    next(error);
  }
};
