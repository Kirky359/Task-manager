import { z } from "zod";

export const taskSchema = z.object({
  task: z.string().min(1),
  due_date: z.coerce.date({ required_error: "Due date is required" }),
});
