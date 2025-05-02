import userSchema from "./userSchema.js";

// Insert new user
export const createNewUser = (userobj) => {
  return userSchema(userobj).save();
};

// update status of the user
export const updateUser = (filter, update) => {
  return userSchema.findOneAndUpdate(filter, update, { new: true });
};

// GET user by email
export const getUserByEmail = (email) => {
  return userSchema.findOne({ email });
};

// get the user
export const getUser = (filter) => {
  return userSchema.findOne(filter);
};
