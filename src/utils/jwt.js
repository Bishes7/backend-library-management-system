import jwt from "jsonwebtoken";
import { createNewSession } from "../models/session/sessionModel.js";
import { updateUser } from "../models/user/userModel.js";

// generate accessJWT
export const accessJWT = async (email) => {
  const token = jwt.sign({ email }, process.env.ACCESSJWT_KEY, {
    expiresIn: "60m",
  });
  const obj = {
    token,
    association: email,
    expire: new Date(Date.now() + 3600000),
  };
  const newSession = await createNewSession(obj);
  return newSession?._id ? token : null;
};

// generate refreshJWT
export const refreshJWT = async (email) => {
  const refreshJWT = jwt.sign({ email }, process.env.REFRESHJWT_KEY, {
    expiresIn: "30d",
  });
  const user = await updateUser({ email }, { refreshJWT });
  return user?._id ? refreshJWT : null;
};

// Function to store both jwts

export const getjwts = async (email) => {
  return {
    accessJWT: await accessJWT(email),
    refreshJWT: await refreshJWT(email),
  };
};

// Verify AccessJWT
export const VerifyExcessJWT = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESSJWT_KEY);
  } catch (error) {
    return error.message;
  }
};

// verify refreshJWT
export const verifyrefreshJWT = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESHJWT_KEY);
  } catch (error) {
    return error.message;
  }
};
