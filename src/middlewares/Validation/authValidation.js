import Joi from "joi";
import { validateData } from "./serverValidation.js";

export const newUserValidation = (req, res, next) => {
  const obj = {
    fName: Joi.string().min(5).required(),
    lName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };
  validateData({ req, res, next, obj });
};
