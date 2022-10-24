import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  budgets: [ { id: Schema.Types.ObjectId } ],
  favorites: [ { id: Schema.Types.ObjectId } ]
}, {
  timestamps: true
});

const userModel = mongoose.model("User", userSchema);

export default userModel;