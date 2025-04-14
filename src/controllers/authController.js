import { clientResponse } from "../middlewares/clientResponse.js";
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
      const message = "Please check your email for verification link ";
      return clientResponse({ req, res, message });
    }
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "Email already exists, Please try new email";
      error.statusCode = 400;
    }
    next(error);
  }
};
