import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phone: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true, maxLength: 20 },
  dogName: { type: String, maxLength: 20 },
  dogBreed: { type: String },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
