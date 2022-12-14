import { Request, Response, NextFunction } from "express";
import credentialSchema from "@/schema/credential-schema";

export function credentialMiddle(req: Request, res: Response, next: NextFunction){
    const validation = credentialSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const erros = validation.error.details.map((detail) => detail.message);
      res.status(400).send(erros);
      return;
    }
    next();
};

