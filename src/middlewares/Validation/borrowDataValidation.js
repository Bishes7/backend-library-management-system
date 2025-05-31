import Joi from "joi";
import { validateData } from "./serverValidation.js";

export const borrowDataValidaton = (req, res, next) => {
  const obj = {
    bookId: Joi.string().required(),
    bookTitle: Joi.string().required(),
    thumbnail: Joi.string().required(),
    bookSlug: Joi.string().required(),
  };
  validateData({ req, res, next, obj });
};
