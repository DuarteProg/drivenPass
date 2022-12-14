import { singInPost } from "@/controllers/authentication-controller";
import { userMiddle } from "@/middleware/user-middleware";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter.post("/sign-in", userMiddle, singInPost );

export { authenticationRouter };