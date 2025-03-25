import { Router } from "express";
import {
  getUsers,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/user.js";

//create user router
export const userRouter = Router();

//define routes
userRouter.post("/users/register", registerUser);
userRouter.post("/users/login", loginUser);
userRouter.patch("/users/:id", updateUser);
userRouter.patch("/users/:id", updateUser);
userRouter.get("/users", getUsers);

//export router
export default userRouter;
