import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  surname: z.string().min(1, "Name cannot be empty"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(3, "Password must be at least 3 characters long"),
});
