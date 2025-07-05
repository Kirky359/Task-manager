import express from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import { verifyToken } from "../middleware/authMiddleware";
import taskRoutes from "./taskRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/settings", verifyToken, userRoutes);
router.use("/tasks", verifyToken, taskRoutes);

export default router;
