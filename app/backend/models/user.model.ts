import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  budgets: [ Schema.Types.ObjectId ],
  favorites: [ Schema.Types.ObjectId ]
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;