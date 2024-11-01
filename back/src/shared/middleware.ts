import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./auth-key";

export const asyncWrapper = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === "/login" || req.originalUrl === "/create-user") {
    return next();
  }
  const token: string | undefined = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({
      code: "UNAUTHORIZED",
      message: "La petición no posee un token de seguridad",
      name: "TokenNotIncluded",
    });
  }

  jwt.verify(token, SECRET_KEY, (err, _) => {
    if (err) {
      return res.status(401).json({
        code: "UNAUTHORIZED",
        message: "El token no es válido",
        name: "InvalidToken",
      });
    }
  });

  return next();

};
