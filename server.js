import express from "express";
import cors from "cors";
import morgan from "morgan";
import { dbConnect } from "./src/config/dbConnect.js";
import authRouter from "./src/routers/authRouter.js";
import { erroHandler } from "./src/middlewares/errorHandler.js";
import { clientResponse } from "./src/middlewares/clientResponse.js";

const app = express();
const PORT = process.env.PORT || 8000;

// MIDDLEWARES
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// GET Method for server
app.get("/", (req, res) => {
  const message = "Get Method Working";
  clientResponse({ req, res, message });
});

// Controllers
app.use("/api/v1/auth", authRouter);

// importing DataBase Connection Function

// Global Errror Handler
app.use(erroHandler);

dbConnect()
  .then(() => {
    app.listen(PORT, (error) => {
      error
        ? console.log(error)
        : console.log(`Server is running at http://localhost:${PORT}`);
      dbConnect && console.log("MongoDB connected");
    });
  })
  .catch((error) => console.log(error));
