import { clientResponse } from "../middlewares/clientResponse.js";
import {
  createNewSession,
  deleteSession,
} from "../models/session/sessionModel.js";
import { createNewUser, updateUser } from "../models/user/userModel.js";
import {
  userActivatedNotification,
  userActivationLink,
} from "../services/email/emailService.js";
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

// Method to verify the user
export const activateUser = async (req, res, next) => {
  try {
    const { sessionid, t } = req.body;

    const session = await deleteSession({
      token: t,
      _id: sessionid,
    });

    if (session?._id) {
      // update user status to active

      const user = await updateUser(
        { email: session.association },
        { status: "active" }
      );
      if (user?._id) {
        // respond to the frontend
        userActivatedNotification({ email: user.email, name: user.fName });

        // send email notification
        const message = "Your account has been activated, Login now";
        return clientResponse({ req, res, message });
      }
    }

    const message = "Invalid link or token expired";
    const statusCode = 400;
    clientResponse({ req, res, message, statusCode });
  } catch (error) {
    next(error);
  }
};
