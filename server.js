import express from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();
const PORT = process.env.PORT || 8000;

// MIDDLEWARES
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// GET Method for server
app.get("/", (req, res) => {
  res.json({
    message: "Get Method Working",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running at http://localhost:${PORT}`);
});
