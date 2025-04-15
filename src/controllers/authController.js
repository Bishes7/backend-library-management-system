import { clientResponse } from "../middlewares/clientResponse.js";
import { createNewSession } from "../models/session/sessionModel.js";
import { createNewUser } from "../models/user/userModel.js";
import { userActivationLink } from "../services/email/emailService.js";
import { encryptPasword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";

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
      // send an activation link to their mail
      const newSessionObj = {
        token: uuidv4(),
        association: users.email,
      };
      const session = await createNewSession(newSessionObj);

      if (session?._id) {
        const url = `${process.env.ROOT_URL}/activate-user?sessionid=${session._id}&t=${session.token}`;

        console.log(url);
        const emailId = await userActivationLink({
          email: users.email,
          url,
          name: users.fName,
        });

        if (emailId) {
          const message = "Please check your email for verification link ";
          return clientResponse({ req, res, message });
        }
      }
    }
    throw new Error("unable to create an account");
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "Email already exists, Please try new email";
      error.statusCode = 400;
    }
    next(error);
  }
};
