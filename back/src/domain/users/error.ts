import { ApplicationError, JSONObject, JSONValue } from "../../shared";

export class IncorrectUsernameFormat extends ApplicationError {

  static create(msg: string, metadata?: JSONObject): IncorrectUsernameFormat {
    return new IncorrectUsernameFormat(this.name, "BUSINESS_ERROR", msg, metadata);
  }
}

export class IncorrectPasswordFormat extends ApplicationError {

  static create(msg: string, metadata?: JSONObject): IncorrectPasswordFormat {
    return new IncorrectPasswordFormat(this.name, "BUSINESS_ERROR", msg, metadata);
  }
}

export class UsernameAlreadyExists extends ApplicationError {

  static create(metadata?: JSONObject): UsernameAlreadyExists {
    return new UsernameAlreadyExists(this.name, "BUSINESS_ERROR", "El nombre de usuario ya se encuentra registrado", metadata);
  }
}

export class UserNotExists extends ApplicationError {

  static create(metadata?: JSONObject): UserNotExists {
    return new UserNotExists(this.name, "BUSINESS_ERROR", "El usuario no se encuentra registrado", metadata);
  }
}

export class PasswordIsNotCorrect extends ApplicationError {

  static create(metadata?: JSONObject): PasswordIsNotCorrect {
    return new PasswordIsNotCorrect(this.name, "BUSINESS_ERROR", "La contraseña no es correcta", metadata);
  }
}