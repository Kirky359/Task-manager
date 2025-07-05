import { Request, Response } from "express";
import { taskInput } from "../types/taskInput";
import {
  createTaskService,
  updateTaskService,
  deleteTaskService,
} from "../services/taskService";
import { taskSchema } from "../vaildators/taskValidator";
import { CreateTaskInput } from "../types/createTaskInput";

export const createTask = async (req: Request, res: Response) => {
  try {
    const validated: CreateTaskInput = taskSchema.parse(req.body);

    const task: taskInput = {
      ...validated,
      created_dt: new Date(),
      completed: false,
    };

    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: No user ID in token" });
      return;
    }
    const taskId = await createTaskService(task, userId);

    res.status(201).json({
      status: "Success",
      message: "Task created!",
      task: {
        task: task.task,
        due_date: task.due_date,
        created_dt: task.created_dt,
        completed: task.completed ?? false,
        taskId: taskId,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "Failed", message: (err as Error).message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task: taskInput = req.body;
    const taskId = req.params.id;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: No user ID in token" });
      return;
    }

    await updateTaskService(task, userId, taskId);

    res.status(200).json({
      status: "Success",
      message: "Task updated!",
      task: {
        task: task.task,
        due_date: task.due_date,
        created_dt: task.created_dt,
        completed: task.completed ?? false,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "Failed", message: (err as Error).message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized: No user ID in token" });
      return;
    }
    await deleteTaskService(userId, taskId);
    res
      .status(200)
      .json({ status: "Success", message: "Task deleted successfully!" });
  } catch (err) {
    res.status(500).json({ status: "Failed", message: (err as Error).message });
  }
};
