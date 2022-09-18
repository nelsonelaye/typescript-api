"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const user_1 = __importDefault(require("./controller/user"));
const port = 2000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).json({
        message: "typescript is tooo typed",
    });
});
app.use("/api", user_1.default);
app.listen(port, () => {
    console.log("listening to port: ", port);
    db_1.default;
});
