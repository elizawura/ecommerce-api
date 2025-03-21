import { Router } from "express";
import { loginUser, registerUser, updateUser } from "../controllers/user.js";

//create user router
export const userRouter = Router();

//define routes
userRouter.post("/users/register", registerUser);
userRouter.post("/users/login", loginUser);
userRouter.patch("/users/:id", updateUser);

//export router
export default userRouter;
