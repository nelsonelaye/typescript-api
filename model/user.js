"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
exports.default = mongoose_1.default.model("users", userSchema);
