import express from "express";
import { clientResponse } from "../middlewares/clientResponse.js";
import { VerifyExcessJWT } from "../utils/jwt.js";
import { checkToken } from "../models/session/sessionModel.js";
import { getUserByEmail } from "../models/user/userModel.js";

const router = express.Router();

router.get("/profile", async (req, res) => {
  // Get accessJWT
  const { authorization } = req.headers;
  console.log(authorization);

  if (authorization) {
    const token = authorization.split(" ")[1];
    // check if valid

    const verfiedToken = VerifyExcessJWT(token);
    console.log(verfiedToken);

    if (verfiedToken.email) {
      // check accessJWT exist in session table
      const checkedSessionToken = await checkToken({ token });
      console.log(checkedSessionToken);

      if (checkedSessionToken?._id) {
        // get user by email
        const user = await getUserByEmail(verfiedToken.email);
        console.log(user);
        // return user
      }
    }
    return res.json({
      message: "Get Method",
    });
  }
  clientResponse({ req, res, message: "Unauthorized", statusCode: 401 });
});

export default router;
