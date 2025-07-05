import { pool } from "../models/database/db";
import { userInput } from "../types/userInput";
import bcrypt from "bcrypt";

export async function userExistByID(userId: string) {
  const userExist = await pool.query(`SELECT * FROM users WHERE id=$1`, [
    userId,
  ]);

  if (userExist.rows.length === 0) {
    throw new Error("Error! No users found by id!");
  }
  return userExist.rows[0];
}

export async function deleteUserService(userId: string) {
  const foundUser = await userExistByID(userId);
  await pool.query(`DELETE from users WHERE id=$1`, [foundUser.id]);
}

export const updateUserService = async (
  userId: string,
  user: userInput,
  currentPassword: string
) => {
  const foundUser = await userExistByID(userId);

  const fieldToUpdate: string[] = [];
  const data: any[] = [];
  let temp: number = 1;

  if (user.email && user.email !== foundUser.email) {
    fieldToUpdate.push(`email = $${temp++}`);
    data.push(user.email);
  }
  if (user.name && user.name !== foundUser.name) {
    fieldToUpdate.push(`name = $${temp++}`);
    data.push(user.name);
  }
  if (user.surname && user.surname !== foundUser.surname) {
    fieldToUpdate.push(`surname = $${temp++}`);
    data.push(user.surname);
  }

  if (user.password) {
    const isMatch = await bcrypt.compare(user.password, foundUser.password);

    if (user.password && !isMatch && currentPassword != undefined) {
      const isValid = await bcrypt.compare(currentPassword, foundUser.password);
      if (!isValid) {
        throw Error("Wrong current password!");
      }
      fieldToUpdate.push(`password = $${temp++}`);
      const newPassword = await bcrypt.hash(user.password, 10);
      data.push(newPassword);
    }
  }
  const query = `UPDATE users SET ${fieldToUpdate.join(
    ", "
  )} WHERE id = $${temp}`;

  data.push(userId);

  await pool.query(query, data);
};
