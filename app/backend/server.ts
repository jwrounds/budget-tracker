import express from "express"
import budgets from "./routes/budgets.route";
import users from "./routes/user.routes";
import errorHandler from "./middleware/errorHandler";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";

// Configuration and database connection
dotenv.config();
const port = process.env.PORT;
connectDB();

const app = express();

// Connect middleware to app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler);


// Connect routes to app
app.use("/api/v1/budgets", budgets);
app.use("/api/v1/users", users);
app.use("*", (_req, res) => {
  res.status(404);
  throw new Error("Page not found!");
});

app.listen(port, () => console.log(`Listening on port ${port}!`));