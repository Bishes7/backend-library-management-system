import bcrypt from "bcryptjs";

// Function to encrypt the password
const saltRound = 15;
export const encryptPasword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, saltRound);
};

// Function to comapre the password

export const comparePassword = (plainPassword, hashPassword) => {
  return bcrypt.compareSync(plainPassword, hashPassword);
};
