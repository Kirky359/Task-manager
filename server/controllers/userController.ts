import { Request, Response } from "express";
import { userInput } from "../types/userInput";
import { deleteUserService, updateUserService } from "../services/userService";

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user: userInput = req.body;
    const id = req.user?.userId;

    if (!id) {
      res.status(401).json({ message: "Unauthorized: No user ID in token" });
      return;
    }

    await deleteUserService(id);

    res
      .status(200)
      .json({ status: "Success", message: "User deleted successfully!" });
  } catch (err) {
    res.status(500).json({ status: "Failed", message: (err as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.user?.userId;
    const { currentPassword, ...user } = req.body;
    if (!id) {
      res.status(401).json({ message: "Unauthorized: No user ID in token" });
      return;
    }

    await updateUserService(id, user, currentPassword);

    res
      .status(200)
      .json({ status: "Success", message: "User updated successfully!" });
  } catch (err) {
    res.status(500).json({ status: "Failed", message: (err as Error).message });
  }
};
