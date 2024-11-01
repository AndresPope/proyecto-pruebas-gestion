import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "./application-error";
import { getErrorMessage } from "./ts-error-handling";
import { z } from "zod";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Si no es un error, continuamos con el siguiente middleware
  if (!error) {
    return next();
  }

  // Si es un ApplicationError, manejarlo específicamente
  if (error instanceof ApplicationError) {
    return res.status(400).json(error.toJSON());
  }

  if (error instanceof z.ZodError) {
    return res.status(400).json({
      name: "ZodError",
      code: "BAD_INPUT",
      message: "Zod found a validation issue",
      metadata: {
        errors: error.errors,
      },
    });
  }

  const msg = getErrorMessage(error);

  // Para otros tipos de errores, enviar una respuesta genérica
  return res.status(500).json({
    name: "InternalServerError",
    code: "INTERNAL_SERVER_ERROR",
    message: msg,
  });
};
