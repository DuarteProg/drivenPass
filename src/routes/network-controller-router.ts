
import { allnetworks, deleteById, networkById, postNetwork } from "@/controllers/network-controllers";
import { authenticateToken } from "@/middleware/authenticationToken";
import { networkMiddle } from "@/middleware/network-middleware";

import {Router} from "express";




const networkRouter = Router();

networkRouter.get("/network", authenticateToken, allnetworks);
networkRouter.get("/network/:id", authenticateToken, networkById);
networkRouter.post("/network", authenticateToken, networkMiddle, postNetwork);
networkRouter.delete("/network/:id", authenticateToken, deleteById);

export default networkRouter;