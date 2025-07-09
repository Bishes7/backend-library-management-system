import { clientResponse } from "../middlewares/clientResponse.js";
import {
  checkToken,
  createNewSession,
  deleteSession,
  deleteSessionToken,
} from "../models/session/sessionModel.js";
import {
  createNewUser,
  getUserByEmail,
  updateUser,
} from "../models/user/userModel.js";
import {
  passwordUpdateNotification,
  pswOTPNotification,
  userActivatedNotification,
  userActivationLink,
} from "../services/email/emailService.js";
import { comparePassword, encryptPasword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import { getjwts } from "../utils/jwt.js";
import { generateOTP } from "../utils/randomNumGenerator.js";
const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";

// Insert New User
export const insertNewUser = async (req, res, next) => {
  console.log("✅ Frontend URL used:", frontendURL);

  try {
    // receive user data
    const { password } = req.body;
    // encrypt user password
    req.body.password = encryptPasword(password);
    // insert users into the db
    const users = await createNewUser(req.body);
    // send an unique activation link to their mail
    if (users?._id) {
      const newSessionObj = {
        token: uuidv4(),
        association: users.email,
      };
      const session = await createNewSession(newSessionObj);
      // send an activation link to their mail
      if (session?._id) {
        const url = `${frontendURL}/activate-user?sessionid=${session._id}&t=${session.token}`;

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

// Login Method
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // get user by emai;
    const user = await getUserByEmail(email);
    if (user?._id) {
      // compare password
      const isPswMatched = comparePassword(password, user.password);
      if (isPswMatched) {
        // create jwts
        const jwts = await getjwts(email);
        // response jwts
        return clientResponse({
          req,
          res,
          message: "Login Successfully",
          payload: jwts,
        });
      }
    }
    const message = "Invalid login details !!";
    const statusCode = 401;
    clientResponse({ req, res, message, statusCode });
  } catch (error) {
    next(error);
  }
};

// Logout User
export const logoutUser = async (req, res, next) => {
  try {
    // get the token
    const { email } = req.userInfo;
    // update refeshJWt to ""
    await updateUser({ email: email }, { refreshJWT: "" });
    // remove accessJWT
    await deleteSessionToken({ association: email });
    clientResponse({ req, res, message: "Log Out Successfully" });
  } catch (error) {
    next(error);
  }
};

// password reset`
export const passwordReset = async (req, res, next) => {
  try {
    // get user by email
    const { email } = req.body;

    const user = await getUserByEmail(email);
    if (user?._id) {
      // Generate otp
      const randomOTP = generateOTP();

      // store in session table
      const sessionOTP = await createNewSession({
        token: randomOTP,
      });

      if (sessionOTP?._id) {
        const info = await pswOTPNotification({
          email,
          name: user.fName,
          randomOTP,
        });
      }
    }

    clientResponse({
      req,
      res,
      message: "OTP is sent to your email",
    });
  } catch (error) {
    next(error);
  }
};

// Update Password
export const updateNewPassword = async (req, res, next) => {
  try {
    const { email, password, randomOTP } = req.body;
    //  Check OTP in session table

    const checkedToken = await checkToken({ token: randomOTP });

    if (checkedToken?._id) {
      // encrypt the password
      const encrypted = encryptPasword(password);

      // update the user
      const user = await updateUser({ email }, { password: encrypted });

      if (user?._id) {
        // send email notification to the client
        const message = passwordUpdateNotification({
          name: user.fName,
          email,
        });

        return clientResponse({
          req,
          res,
          message: "Your password has been updated successfully",
        });
      }
    }
    clientResponse({
      req,
      res,
      message: "Ivalid token or expired",
      statusCode: 400,
    });
  } catch (error) {
    next(error);
  }
};

// change the password
export const changePasswordController = async (req, res, next) => {
  try {
    const { email } = req.userInfo;
    const { password: currentPassword, newPassword } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      return clientResponse({
        req,
        res,
        message: "User not found",
        statusCode: 404,
      });
    }

    const isPswMatched = comparePassword(currentPassword, user.password);

    if (!isPswMatched) {
      return clientResponse({
        req,
        res,
        message: "Current password is incorrect",
        statusCode: 400,
      });
    }
    user.password = encryptPasword(newPassword);
    await user.save();
    return clientResponse({
      req,
      res,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};
