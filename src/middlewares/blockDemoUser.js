import { clientResponse } from "./clientResponse";

export const blockDemoUser = (req, res, next) => {
  if (req.userInfo?.isDemo) {
    return clientResponse({
      req,
      res,
      message: "Demo user is not allowed to perform this action",
      statusCode: 403,
    });
  }
  next();
};
