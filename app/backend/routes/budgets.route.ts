import express from "express";
import {
  getBudgets,
  postBudget,
  getBudgetById,
  updateBudgetById,
  deleteBudgetById
} from "../controllers/budgets.controller";
//import { MongoClient } from "mongodb";

/* const uri = "mongodb+srv://db_admin_1:9YyYbqeZECReEKv@cluster0.3l3ssff.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { monitorCommands: true });

const run = async () => {
  try {
    const db = client.db("sample_budgets");
    const budgets = db.collection("budgets");

    const cursor = budgets.find();

    if (await budgets.countDocuments() === 0) {
      console.log("No Documents Found!");
    } 

    await cursor.forEach(console.dir);
  } finally {
    await client.close();
  }
}
 */

const router = express.Router();

router.route("/").get(getBudgets).post(postBudget);
router.route("/:id").get(getBudgetById).put(updateBudgetById).delete(deleteBudgetById);

export default router;