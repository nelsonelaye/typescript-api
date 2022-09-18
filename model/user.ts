import mongoose from "mongoose";

type Schema = {
  fullname: string;
  email: string;
  password: string;
  isVerify: Boolean;
  otp: number;
  inputOtp: number;
};

interface User extends Schema, mongoose.Document {}

const userSchema: mongoose.Schema = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
    },
    inputOtp: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model<User>("users", userSchema);
