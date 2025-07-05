import { Request, Response } from "express";
import { userInput } from "../types/userInput";
import { authUser, loginUser } from "../services/authService";
import { userSchema } from "../vaildators/userValidator";

export const signUpUser = async (req: Request, res: Response) => {
  try {
    const user: userInput = userSchema.parse(req.body);
    const rawPassword: string = user.password;
    await authUser(user);

    const userSend = {
      email: user.email,
      name: user.name,
      surname: user.surname,
    };

    await loginUser(user, rawPassword);
    res
      .status(200)
      .json({ status: "Success", message: "User added!", userSend });
  } catch (err) {
    res.status(500).json({ status: "Failed", message: (err as Error).message });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const validateUser = userSchema.parse(req.body);

    const user: userInput = validateUser;
    const token = await loginUser(user, user.password);

    const userSend = {
      email: user.email,
      name: user.name,
      surname: user.surname,
    };
    res
      .status(200)
      .json({ status: "Success", message: "User logged in!", userSend, token });
  } catch (err) {
    res.status(401).json({ status: "Failed", message: (err as Error).message });
  }
};
