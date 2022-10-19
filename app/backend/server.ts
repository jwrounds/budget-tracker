import express from "express"
import cors from "cors"
import budgets from "./api/budgets.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/budgets", budgets);
app.use("*", (_req, res) => res.status(404).json({error: "Page not found!"}));

export default app;