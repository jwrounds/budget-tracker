import mongoose from "mongoose";
const { Schema } = mongoose;

const budgetItemSchema = new Schema({
  name: { type: String, required: true },
  budget_percent: { type: Number, required: true }
}, {
  _id: false
});

const budgetSchema = new Schema({
  username: { type: String },
  budget_interval: { type: String, required: true },
  persons: { type: Number, required: false},
  totalBudget: { type: Number, required: false, default: 0 },
  expenses: [ budgetItemSchema ]
}, {
  timestamps: true
});

const budgetModel = mongoose.model("Budget", budgetSchema);

export default budgetModel;