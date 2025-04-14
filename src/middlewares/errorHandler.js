import { clientResponse } from "./clientResponse.js";

export const erroHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  const message = error.message;
  clientResponse({ req, res, statusCode, message });
};
