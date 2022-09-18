import express, { Request, Response } from "express";
import db from "./config/db";
import router from "./controller/user";

const port: number = 2000;

const app = express();
app.use(express.json())
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "typescript is tooo typed",
  });
});

app.use("/api", router);

app.listen(port, () => {
  console.log("listening to port: ", port);
  db;
});
