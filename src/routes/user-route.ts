import { authenticateToken } from "@/middleware/authenticationToken";
import { userMiddle } from "@/middleware/user-middleware";
import {Router} from "express";
import createUser from "../controllers/user-controller";



const userRouter = Router();

userRouter.post("/users", userMiddle, createUser);


export default userRouter;