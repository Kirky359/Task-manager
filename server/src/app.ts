import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { pool } from "../models/database/db";
import { initializeDb } from "../models/database/db-init";
import indexRoutes from "../routes/indexRoutes";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
app.use("/api", indexRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Typescript init!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
  testDbConnectivity();
});

async function testDbConnectivity() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log(`Database is succesfully conected`, res);
  } catch (error) {
    console.error(`Database is not connected ${error}`);
  }
}

initializeDb();
