import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // password required only if NOT google user
      },
    },
    googleId: {
      type: String,
    },
  },
  { timestamps: true },
);

const User=mongoose.model("USER",userSchema);
export default User;