import express from "express";
import cors from "cors";
import morgan from "morgan";
import { dbConnect } from "./src/config/dbConnect.js";
import authRouter from "./src/routers/authRouter.js";
import { erroHandler } from "./src/middlewares/errorHandler.js";
import { clientResponse } from "./src/middlewares/clientResponse.js";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import userRouter from "./src/routers/userRouter.js";
import booksRouter from "./src/routers/booksRouter.js";
import borrowsRouter from "./src/routers/borrowRouter.js";
import reviewsRouter from "./src/routers/reviewRouter.js";
import statsRouter from "./src/routers/statsRouter.js";

const app = express();
const PORT = process.env.PORT || 8000;

// MIDDLEWARES
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET Method for server
app.get("/", (req, res) => {
  const message = "Get Method Working";
  clientResponse({ req, res, message });
});

// Controllers
// authentication
app.use("/api/v1/auth", authRouter);
// users
app.use("/api/v1/user", userRouter);
// books
app.use("/api/v1/books", booksRouter);

app.use("/api/v1/borrows", borrowsRouter);

app.use("/api/v1/reviews", reviewsRouter);

app.use("/api/stats", statsRouter);

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
