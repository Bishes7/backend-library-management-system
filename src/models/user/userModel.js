import userSchema from "./userSchema.js";

// Insert new user
export const createNewUser = (userobj) => {
  return userSchema(userobj).save();
};
