import { JSONObject } from "../types";
import { getErrorMessage } from "./ts-error-handling";

export type TApplicationError = {
  message: string;
  code: string;
  metadata?: JSONObject;
  name: string
}

export class ApplicationError extends Error {

  constructor(
    public readonly name: string,
    public readonly code: string,
    public readonly message: string,
    public readonly metadata?: JSONObject,
  ) {
    super(message);
  }

  public toJSON(): TApplicationError {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      metadata: this.metadata,
    };
  }
}

export class UnknownError extends ApplicationError {

  static create(error: unknown, metadata: JSONObject): UnknownError {
    const msg = getErrorMessage(error);
    return new UnknownError(this.name, "UNKNOWN_ERROR", msg, metadata);
  }
}

export class RequestHasNoBody extends ApplicationError {

  static create(metadata?: JSONObject): RequestHasNoBody {
    return new RequestHasNoBody(this.name, "BAD_INPUT", "Request has no body", metadata);
  }
}

export class RequestBodyIncomplete extends ApplicationError {

  static create(metadata?: JSONObject): RequestBodyIncomplete {
    return new RequestBodyIncomplete(this.name, "BAD_INPUT", "La información de la petición no esta completa", metadata);
  }
}

export class PaginationError extends ApplicationError {

  static create(msg: string, metadata?: JSONObject): PaginationError {
    return new PaginationError(this.name, "BAD_INPUT", msg, metadata);
  }
}