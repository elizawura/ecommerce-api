import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.js";

//create user router
export const userRouter = Router();

//define routes
userRouter.post("/users/register", registerUser);
userRouter.post("/users/login", loginUser);

//export router
export default userRouter;
