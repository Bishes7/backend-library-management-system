export const clientResponse = ({
  req,
  res,
  message,
  statusCode = 200,
  payload,
}) => {
  // Success Response
  req.success = () => {
    return res.status(statusCode).json({
      status: "success",
      message,
      payload,
    });
  };
  // Error Respopnse
  req.error = () => {
    return res.status(statusCode).json({
      status: "error",
      message,
    });
  };

  if (statusCode >= 200 && statusCode < 300) {
    return req.success();
  } else {
    return req.error();
  }
};
