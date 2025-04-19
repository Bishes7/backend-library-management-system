import joi from "joi";
import { clientResponse } from "../clientResponse.js";

export const validateData = ({ req, res, next, obj }) => {
  // create schema or rules
  const schema = joi.object(obj);
  // pass your data, req.body to the schema
  const { error } = schema.validate(req.body);

  if (error) {
    clientResponse({
      req,
      res,
      message: error.message,
      statusCode: 400,
    });
  }
  next();
};
