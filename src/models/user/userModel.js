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

// update user status
export const updateUserStatus = async (id) => {
  const user = await userSchema.findById(id);

  if (!user) return null;

  // change the status
  user.status = user.status === "active" ? "inactive" : "active";
  await user.save();
  return user;
};

// Update user role

export const updateUserRole = async (id) => {
  const user = await userSchema.findById(id);

  if (!user) return null;

  user.role = user.role === "admin" ? "user" : "admin";
  await user.save();
  return user;
};

// get Single User
export const getSingleUser = (id) => {
  return userSchema.findById(id).select("-password");
};

// upload profile image
export const uploadProfileImage = (userId, imagePath) => {
  return userSchema.findByIdAndUpdate(
    userId,
    { profilePic: `/image/${imagePath}` },
    { new: true }
  );
};

// update profie details
export const updateProfileDetails = (id) => {
  return userSchema.findById(id);
};
