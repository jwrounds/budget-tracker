import express from "express"
import budgets from "./routes/budgets.route";
import { errorHandler } from "./middleware/errorHandler";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
dotenv.config();

connectDB();

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/budgets", budgets);
app.use("*", (_req, res) => res.status(404).json({error: "Page not found!"}));

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}!`));

export default app;