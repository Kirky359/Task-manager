import { pool } from "../models/database/db";
import bcrypt from "bcrypt";
import { jwtInit } from "../models/jwt/jwt-init";
import { userInput } from "../types/userInput";

export async function userExistLogin(user: userInput) {
  const userExist = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    user.email,
  ]);

  if (userExist.rows.length === 0) {
    throw new Error("Error! No users found!");
  }
  return userExist.rows[0];
}

export async function authUser(user: userInput) {
  const userExist = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    user.email,
  ]);

  if (userExist.rowCount !== 0) {
    throw new Error("Error! User already exists!");
  }

  user.password = await bcrypt.hash(user.password, 10);
  try {
    await pool.query(
      `INSERT INTO users (
      name, surname, email, password)
      VALUES ($1, $2, $3, $4) `,
      [user.name, user.surname, user.email, user.password]
    );
  } catch (err) {
    throw new Error("Error! User's data upload failed!");
  }
}

export async function loginUser(user: userInput, rawPassword: string) {
  const foundUser = await userExistLogin(user);

  const isMatch = await bcrypt.compare(rawPassword, foundUser.password);
  console.log(user.password + "\n" + foundUser.password);

  if (!isMatch) {
    throw new Error("Invalid credentials!");
  }

  const token = await jwtInit(foundUser.id);
  return token;
}
