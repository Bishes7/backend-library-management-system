import Joi from "joi";
import { validateData } from "./serverValidation.js";

export const reviewValidation = (req, res, next) => {
  const obj = {
    bookId: Joi.string().required(),
    title: Joi.string().required(),
    reviewMessage: Joi.string().min(1).max(100).required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    borrowId: Joi.string().required(),
  };
  validateData({ req, res, next, obj });
};
