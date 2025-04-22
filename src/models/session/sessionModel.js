import sessionSchema from "./sessionSchema.js";

// insert new session
export const createNewSession = (sessionobj) => {
  return sessionSchema(sessionobj).save();
};

// Delete Method
export const deleteSession = (filter) => {
  return sessionSchema.findOneAndDelete(filter);
};

// checking if the token exist in session table
export const checkToken = (filter) => {
  return sessionSchema.findOne(filter);
};
