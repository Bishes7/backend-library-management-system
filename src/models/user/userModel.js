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

// get all users
export const getAllUsers = () => {
  return userSchema.find().sort({ createdAt: -1 }).select("-password");
};

// get weekly user stats
export const getWeeklyUserStats = async () => {
  const results = await userSchema.aggregate([
    {
      $group: {
        _id: {
          $isoWeek: "$createdAt",
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const labels = results.map((r, i) => `week ${i + 1}`);
  const data = results.map((r) => r.count);

  return { labels, data };
};

// user stats for dashboard
export const dashboardUserStats = () => {
  return userSchema.countDocuments();
};

// delete users
export const deleteUser = (_id) => {
  return userSchema.findByIdAndDelete(_id);
};
