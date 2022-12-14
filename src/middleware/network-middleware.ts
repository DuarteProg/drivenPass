import { Request, Response, NextFunction } from "express";
import networkSchema from "@/schema/network-schema";

export function networkMiddle(req: Request, res: Response, next: NextFunction){
    const validation = networkSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const erros = validation.error.details.map((detail) => detail.message);
      res.status(400).send(erros);
      return;
    }
    next();
};
