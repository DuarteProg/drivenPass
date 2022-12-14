import { duplicatedEmailError } from "@/errors";
import userService from "@/services/user-service";
import { Response, Request } from "express";
import httpStatus from "http-status";




export default async function createUser(req: Request, res: Response) {
const {email, password} = req.body;

try {
    const user = await userService.createUser(email, password)

    return res.status(httpStatus.CREATED).send(user);
} catch (error) {
    if (error.name === "DuplicatedEmailError") {
        return res.status(httpStatus.CONFLICT).send(error);
      }

  return res.status(httpStatus.BAD_REQUEST).send(error);
    }

}
