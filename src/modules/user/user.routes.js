import { Router } from "express";

import {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";

const userRouter = Router();

// 1-Add brand
userRouter.post("/", checkEmail, addUser);

// 2-Get all brands
userRouter.get("/", getAllUsers);

// 3-Get Brand
userRouter.get("/:id", getUser);

// 4-Update Brand
userRouter.put("/:id", updateUser);

// 5-Delete Brand
userRouter.delete("/:id", deleteUser);

export default userRouter;
