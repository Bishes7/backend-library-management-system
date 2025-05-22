import joi from "joi";
import { clientResponse } from "../clientResponse.js";
import { deleteUploadedFiles } from "../../utils/fileImg.js";

export const validateData = ({ req, res, next, obj }) => {
  // create schema or rules
  const schema = Array.isArray(req.body)
    ? joi.array().items(obj)
    : joi.object(obj);
  // pass your data, req.body to the schema
  const { error } = schema.validate(req.body);

  if (error) {
    if (req.file || Array.isArray(req.files)) {
      deleteUploadedFiles(req);
    }
    clientResponse({
      req,
      res,
      message: error.message,
      statusCode: 400,
    });
  }
  next();
};
