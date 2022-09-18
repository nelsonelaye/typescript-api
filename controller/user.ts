import userModel from "../model/user";
import express, { Router, Request, Response } from "express";
const router: Router = express.Router();
import otpGenerator from "otp-generator";

router.get("/user", async (req: Request, res: Response): Promise<Response> => {
  try {
    const users: (string | number)[] = await userModel.find();

    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    console.log(typeof error, error);
    return res.status(500).json({
      message: error,
    });
  }
});

router.get(
  "/user/:userId",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = await userModel.findById(req.params.userId);

      if (!user) {
        return res.status(404).json({
          message: "user not found",
        });
      } else {
        return res.status(200).json({
          data: user,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  }
);

router.post("/user", async (req: Request, res: Response): Promise<Response> => {
  try {
    const { fullname, email, password } = req.body;
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });
    const user = await userModel.create({
      fullname: fullname,
      email: email,
      password,
      otp: parseInt(otp),
    });

    return res.status(201).json({
      data: user,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: error,
    });
  }
});

router.delete(
  "/user/:userId",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = await userModel.findById(req.params.userId);

      if (!user) {
        return res.status(404).json({
          message: "user not found",
        });
      } else {
        await userModel.findByIdAndDelete(user._id);
        return res.status(200).json({
          message: "user deleted",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  }
);

export default router;
