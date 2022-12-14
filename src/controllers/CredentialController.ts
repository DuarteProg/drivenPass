import credentialsService from "@/services/credentials-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function allCredential(req: Request, res: Response) {
  const userId = +res.locals.userId;

  try {
    const credentials = await credentialsService.getAllCredentials(userId);
    return res.status(httpStatus.OK).send(credentials);
  } catch (error) {
    if (error.name === "NotFoundError")
      return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "UnauthorizedError")
      return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
export async function credentialById(req: Request, res: Response) {
  const userId = res.locals.userId;
  const id = +req.params.id;

  try {
    const response = await credentialsService.CredentialById(userId, id);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    if (error.name === "NotFoundError")
      return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "UnauthorizedError")
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
export async function postCredential(req: Request, res: Response) {
  const  userId  = +res.locals.userId;
  const {title, url, username, password} = req.body;

  try {
      await credentialsService.validateTitle(userId, title);
      await credentialsService.createCredential(userId, title, url, username, password);
      return res.status(httpStatus.OK).send("Sucessfull");
    
  } catch (error) {
    if (error.name === "DuplicatedtitleError")
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
export async function DeleteById(req: Request, res: Response) {
  const userId  = +res.locals.userId;
  const  id  = +req.params.id;

  try {
      await credentialsService.deleteCredentialId(userId, id);
      return res.status(httpStatus.OK).send("Sucess");
    
  } catch (error) {
    if (error.name === "HasNoIdError")
    return res.sendStatus(httpStatus.UNAUTHORIZED);

    if (error.name === "NotFoundError")
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
