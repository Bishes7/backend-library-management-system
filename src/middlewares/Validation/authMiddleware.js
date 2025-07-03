import { checkToken } from "../../models/session/sessionModel.js";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  getUser,
  getUserByEmail,
  getWeeklyUserStats,
  updateProfileDetails,
  updateUserRole,
  updateUserStatus,
  uploadProfileImage,
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

// get all users
export const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    if (users) {
      clientResponse({
        req,
        res,
        message: "Here are the list of all users",
        payload: users,
      });
    }
  } catch (error) {
    next(error);
  }
};

// Delete User
export const deleteUserController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const payload = await deleteUser(id);
    if (payload._id) {
      return clientResponse({
        req,
        res,
        message: "User has been deleted",
      });
    }
  } catch (error) {
    next(error);
  }
};

// Update User status
export const updateUserStatusController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const payload = await updateUserStatus(id);
    if (payload?._id) {
      return clientResponse({
        req,
        res,
        message: "User status updated Successfully",
        payload,
      });
    }
    return clientResponse({
      req,
      res,
      message: "User not found",
      statusCode: 404,
    });
  } catch (error) {
    next(error);
  }
};

// Update User role
export const updateUserRoleController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const payload = await updateUserRole(id);
    if (payload?._id) {
      return clientResponse({
        req,
        res,
        message: "Role is Updated Succesfully",
        payload,
      });
    }
    clientResponse({
      req,
      res,
      message: "Unable to update role at this time",
      statusCode: 404,
    });
  } catch (error) {
    next(error);
  }
};

//  get single user by id
export const getSingleUserController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const payload = await getSingleUser(id);
    if (payload?._id) {
      return clientResponse({
        req,
        res,
        message: "Here is the selected User details",
        payload,
      });
    }
    clientResponse({
      req,
      res,
      message: "Error fetching user at this time",
      statusCode: 404,
    });
  } catch (error) {
    next(error);
  }
};

// upload profile pic
export const uploadProfileImageController = async (req, res, next) => {
  try {
    const userId = req.userInfo?._id;
    const imagePath = req.file?.filename;

    if (!userId) {
      return clientResponse({
        req,
        res,
        message: "UserId is missing",
        statusCode: 401,
      });
    }
    if (!imagePath) {
      return clientResponse({
        req,
        res,
        statusCode: 400,
        message: "No file uploaded",
      });
    }
    const updatedUser = await uploadProfileImage(userId, imagePath);
    if (updatedUser) {
      return clientResponse({
        req,
        res,
        message: "Profile picture uploaded",
        payload: updatedUser,
      });
    }
  } catch (error) {
    next(error);
  }
};

// update profile details
export const updateProfileDetailsController = async (req, res, next) => {
  try {
    const userId = req.userInfo;
    const { fName, lName, email } = req.body;

    // find the user
    const user = await updateProfileDetails(userId);

    if (!user) {
      return clientResponse({
        req,
        res,
        message: "User not found",
        statusCode: 404,
      });
    }

    user.fName = fName;
    user.lName = lName;
    user.email = email;

    // save the updated user in db
    await user.save();

    // send the response
    return clientResponse({
      req,
      res,
      message: "Profile Updated Successfully",
      payload: {
        fName,
        lName,
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};
