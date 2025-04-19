import userSchema from "./userSchema.js";

// Insert new user
export const createNewUser = (userobj) => {
  return userSchema(userobj).save();
};

// update status of the user
export const updateUser = (filter, update) => {
  return userSchema.findOneAndUpdate(filter, update, { new: true });
};
