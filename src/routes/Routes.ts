import { Router } from "express";
import { authenticationRouter } from "./authentication-router";
import credentialRouter from "./credential-router";
import networkRouter from "./network-controller-router";
import userRouter from "./user-route";

const router = Router();
router.use(userRouter)
router.use(authenticationRouter)
router.use("/credential", credentialRouter);
router.use(networkRouter)

export default router;