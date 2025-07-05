import { taskInput } from "../types/taskInput";
import { pool } from "../models/database/db";

export const userConfirm = async (userId: string, taskId: string) => {
  const task = await pool.query(
    `SELECT * FROM tasks WHERE id = $1 AND user_id = $2`,
    [taskId, userId]
  );
  if (task.rows.length === 0) {
    throw new Error("Task not found or access denied");
  }
};

export const findTaskById = async (taskId: string) => {
  const foundUser = await pool.query(`SELECT * FROM tasks WHERE id=$1 `, [
    taskId,
  ]);

  if (foundUser.rows.length === 0) {
    throw new Error("Task not found");
  }

  return foundUser.rows[0];
};
export const validateTaskLogic = async (task: taskInput) => {
  const create_date = new Date(task.created_dt);
  const due_date = new Date(task.due_date);

  if (due_date.getTime() <= create_date.getTime()) {
    throw new Error("Invalid dates: due_date must be after created_dt.");
  }
};

export const createTaskService = async (task: taskInput, userId: string) => {
  await validateTaskLogic(task);
  const taskId = await pool.query(
    `INSERT INTO tasks (task, due_date, completed, user_id) VALUES ($1, $2, $3, $4) RETURNING id`,
    [task.task, task.due_date, task.completed ?? false, userId]
  );

  return taskId;
};

export const updateTaskService = async (
  task: taskInput,
  userId: string,
  taskId: string
) => {
  await validateTaskLogic(task);
  const foundTask: taskInput = await findTaskById(taskId);

  const fieldToUpdate: String[] = [];
  const data: any[] = [];
  let temp = 1;

  if (task.task !== foundTask.task) {
    fieldToUpdate.push(`task = $${temp++}`);
    data.push(task.task);
  }

  if (task.due_date !== foundTask.due_date) {
    fieldToUpdate.push(`due_date = $${temp++}`);
    data.push(task.due_date);
  }

  if (task.completed !== foundTask.completed) {
    fieldToUpdate.push(`completed = $${temp++}`);
    data.push(task.completed);
  }

  const query = `UPDATE tasks SET ${fieldToUpdate.join(
    ", "
  )} WHERE id = $${temp}`;

  data.push(taskId);

  await pool.query(query, data);
};

export const deleteTaskService = async (userId: string, taskId: string) => {
  const foundTask: taskInput = await findTaskById(taskId);

  await userConfirm(userId, taskId);
  await pool.query(`DELETE FROM tasks WHERE id=$1`, [taskId]);
};
