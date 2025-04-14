import bcrypt from "bcryptjs";
const saltRound = 15;
export const encryptPasword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, saltRound);
};
