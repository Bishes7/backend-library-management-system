import { checkToken } from "../../models/session/sessionModel.js";
import {
  getUser,
  getUserByEmail,
  getWeeklyUserStats,
} from "../../models/user/userModel.js";
import {
  accessJWT,
  VerifyExcessJWT,
  verifyrefreshJWT,
} from "../../utils/jwt.js";
import { clientResponse } from "../clientResponse.js";

export const userAuthMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  let message = "Unauthorized";

  if (authorization) {
    const token = authorization.split(" ")[1];
    // check if valid

    const verfiedToken = VerifyExcessJWT(token);

    if (verfiedToken) {
      // check accessJWT exist in session table
      const checkedSessionToken = await checkToken({ token });

      if (checkedSessionToken?._id) {
        // get user by email
        const user = await getUserByEmail(verfiedToken.email);
        if (user?._id) {
          // return user
          req.userInfo = user;
          return next();
        }
      }
    }
    message = verfiedToken === "jwt expired" ? verfiedToken : "Unauthorized";
  }
  clientResponse({ req, res, message, statusCode: 401 });
};

// Check the user is Admin ?
export const adminMiddleware = (req, res, next) => {
  req.userInfo.role === "admin"
    ? next()
    : clientResponse({
        req,
        res,
        message: "You are not allowed  in this feature",
        statusCode: 403,
      });
};

// steps to renew access jwt

export const renewAccessJWT = async (req, res, next) => {
  const { authorization } = req.headers;
  let message = "Unauthorized";
  // get refreshJWT
  if (authorization) {
    const token = authorization.split(" ")[1];

    // check if the token is valid
    const validToken = verifyrefreshJWT(token);

    if (validToken) {
      // get the user from the usertable
      const user = await getUser({
        email: validToken.email,
        refreshJWT: token,
      });
      if (user?._id) {
        // create new accessJWT
        const token = await accessJWT(validToken.email);

        // return accessJWT
        clientResponse({
          req,
          res,
          message: "Updated RefreshJWT",
          payload: token,
        });
      }
    }
  }
  clientResponse({ req, res, message, statusCode: 401 });
};

// get weekly user stats

export const getWeeklyUserStatsController = async (req, res, next) => {
  try {
    const stats = await getWeeklyUserStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
};
