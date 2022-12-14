import userSchema from "../schema/user-schema";
import { Request, Response, NextFunction } from "express";

export function userMiddle(req: Request, res: Response, next: NextFunction){
    const validation = userSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const erros = validation.error.details.map((detail) => detail.message);
      res.status(400).send(erros);
      return;
    }
    next();
};


