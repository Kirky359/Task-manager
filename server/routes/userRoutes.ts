import Express from "express";
import { updateUser } from "../controllers/userController";
import { deleteUser } from "../controllers/userController";
const router = Express.Router();

router.put("/update-user", updateUser);
router.delete("/delete-user", deleteUser);

export default router;
