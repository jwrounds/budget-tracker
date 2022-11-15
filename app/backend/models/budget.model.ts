import mongoose from "mongoose";
const { Schema } = mongoose;

const budgetItemSchema = new Schema({
  name: { type: String, required: true },
  budgetPercent: { type: Number, required: true }
}, {
  _id: false
});

const budgetSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  budgetInterval: { type: String, required: true },
  persons: { type: Number, required: false},
  totalBudget: { type: Number, required: false, default: 0 },
  expenses: [ budgetItemSchema ]
}, {
  timestamps: true
});

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;