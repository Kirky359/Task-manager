import express from "express";
import {
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = express.Router();

router.post("/add-task", createTask);
router.put("/update-task/:id", updateTask);
router.delete("/delete-task/:id", deleteTask);
export default router;
