import credentialsService from "@/services/credentials-service";
import networkService from "@/services/network-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function allnetworks(req: Request, res: Response) {
  const userId = +res.locals.userId;

  try {
    const credentials = await networkService.getAllNetwork(userId);
    return res.status(httpStatus.OK).send(credentials);
  } catch (error) {
    if (error.name === "NotFoundError")
      return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "UnauthorizedError")
      return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
export async function networkById(req: Request, res: Response) {
  const userId = res.locals.userId;
  const id = +req.params.id;

  try {
    const response = await networkService.networkById(userId, id);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    if (error.name === "NotFoundError")
      return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "UnauthorizedError")
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
export async function postNetwork(req: Request, res: Response) {
  const  userId  = +res.locals.userId;
  const {title, network, password} = req.body;

  try {
      await networkService.createNetwork(userId, title, network, password);
      return res.status(httpStatus.OK).send("Sucessfull");
    
  } catch (error) {
    if (error.name === "DuplicatedtitleError")
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
export async function deleteById(req: Request, res: Response) {
  const userId  = +res.locals.userId;
  const  id  = +req.params.id;

  try {
      await networkService.deleteNetworkId(userId, id);
      return res.status(httpStatus.OK).send("Sucess");
    
  } catch (error) {
    if (error.name === "HasNoIdError")
    return res.sendStatus(httpStatus.UNAUTHORIZED);

    if (error.name === "NotFoundError")
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}