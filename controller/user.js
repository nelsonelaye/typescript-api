"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../model/user"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const otp_generator_1 = __importDefault(require("otp-generator"));
router.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        return res.status(200).json({
            data: users,
        });
    }
    catch (error) {
        console.log(typeof error, error);
        return res.status(500).json({
            message: error,
        });
    }
}));
router.get("/user/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({
                message: "user not found",
            });
        }
        else {
            return res.status(200).json({
                data: user,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
}));
router.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, email, password } = req.body;
        const otp = otp_generator_1.default.generate(6, {
            lowerCaseAlphabets: false,
            specialChars: false,
            upperCaseAlphabets: false,
        });
        const user = yield user_1.default.create({
            fullname: fullname,
            email: email,
            password,
            otp: parseInt(otp),
        });
        return res.status(201).json({
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
}));
router.delete("/user/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({
                message: "user not found",
            });
        }
        else {
            yield user_1.default.findByIdAndDelete(user._id);
            return res.status(200).json({
                message: "user deleted",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
}));
exports.default = router;
