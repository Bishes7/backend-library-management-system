import sessionSchema from "./sessionSchema.js";

// insert new session
export const createNewSession = (sessionobj) => {
  return sessionSchema(sessionobj).save();
};

// Delete Method
export const deleteSession = (filter) => {
  return sessionSchema.findOneAndDelete(filter);
};

// GET Token
export const checkToken = (filter) => {
  return sessionSchema.findOne(filter);
};

// delete multiple sessions
export const deleteSessionToken = (filter) => {
  return sessionSchema.deleteMany(filter);
};
