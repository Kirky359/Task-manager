import { pool } from "./db";

export async function initializeDb() {
  try {
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    await pool.query(
      `CREATE TABLE IF NOT EXISTS users( 
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          surname TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL);`
    );

    await pool.query(
      `CREATE TABLE IF NOT EXISTS tasks(
          id SERIAL PRIMARY KEY,
          task TEXT NOT NULL,
          created_dt TIMESTAMP DEFAULT NOW(),
          due_date DATE,
          completed BOOLEAN DEFAULT false,
          user_id UUID REFERENCES users(id) ON DELETE CASCADE);`
    );
  } catch (error) {
    console.error("Db is not inizialized", error);
  }
}
