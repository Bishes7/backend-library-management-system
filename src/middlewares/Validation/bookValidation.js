import Joi from "joi";
import { validateData } from "./serverValidation.js";

// validation for new books
export const newBookValidation = (req, res, next) => {
  const obj = {
    title: Joi.string().required(),
    year: Joi.number().integer().min(1901).max(new Date().getFullYear()),
    author: Joi.string().required(),
    // imgUrl: Joi.string().required(),
    isbn: Joi.string()
      .pattern(/^\d{10}$|^\d{13}$/)
      .messages({
        "string.pattern.base": "ISBN is not in the valid format",
      }),
    genre: Joi.string().required(),
    description: Joi.string().required(),
  };
  validateData({ req, res, next, obj });
};

// validation for upadted books

export const updateBookValidation = (req, res, next) => {
  const obj = {
    status: Joi.string().valid("active", "inactive").required(),
    _id: Joi.string().required(),
    title: Joi.string().required(),
    year: Joi.number().integer().min(1901).max(new Date().getFullYear()),
    author: Joi.string().required(),
    genre: Joi.string().required(),
    description: Joi.string().required(),
    expectedAvailable: Joi.date().allow(null, ""),
  };
  validateData({ req, res, next, obj });
};
