import sessionSchema from "./sessionSchema.js";

// insert new session
export const createNewSession = (sessionobj) => {
  return sessionSchema(sessionobj).save();
};
