import { allCredential, credentialById, DeleteById, postCredential } from "@/controllers/CredentialController";
import { authenticateToken } from "@/middleware/authenticationToken";
import { credentialMiddle } from "@/middleware/credential-middleware";
import {Router} from "express";




const credentialRouter = Router();

credentialRouter.get("/", authenticateToken, allCredential);
credentialRouter.get("/:id", authenticateToken, credentialById);
credentialRouter.post("/", authenticateToken, credentialMiddle, postCredential);
credentialRouter.delete("/:id", authenticateToken, DeleteById);

export default credentialRouter;