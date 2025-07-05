import express from "express";
import { signUpUser } from "../controllers/authController";
import { signInUser } from "../controllers/authController";
const router = express.Router();

router.post("/sign-up", signUpUser);
router.post("/sign-in", signInUser);

export default router;
