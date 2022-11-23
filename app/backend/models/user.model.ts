import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  budget: { type: Schema.Types.ObjectId, default: null }
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;