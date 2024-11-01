import { z } from "zod";
import { IncorrectPasswordFormat, IncorrectUsernameFormat } from "./error";
import { compareSync, hashSync } from "bcrypt";

export class UserInput {

  private static SCHEMA = z.object({
    username: z.string(),
    password: z.string(),
  });

  private constructor(
    public readonly user: string,
    public readonly password: string,
  ) {
  }

  static fromJson(json: unknown): UserInput {
    const parsed = this.SCHEMA.parse(json);
    return new UserInput(parsed.username, parsed.password);
  }

}

export class Username {

  private constructor(
    public readonly value: string,
  ) {
  }

  static create(username: string): Username {
    return new Username(username);
  }

  public toString() {
    return this.value;
  }

  static validate(user: string) {
    if (user.length !== 8) {
      throw IncorrectUsernameFormat.create("El usuario debe tener 8 caracteres", { user });
    }

    const initialLetter = user[0];

    if (initialLetter !== initialLetter.toUpperCase()) {
      throw IncorrectUsernameFormat.create("La primera letra del usuario debe ser mayúscula", { user });
    }

    const usernameLowerCasePart = user.substring(1, 6);

    if (usernameLowerCasePart !== usernameLowerCasePart.toLowerCase()) {
      throw IncorrectUsernameFormat.create("Todas las letras del usuario(exceptuando la inicial) deben estar en minuscula", { user });
    }

    if (Number.isNaN(Number(user[7]))) {
      throw IncorrectUsernameFormat.create("El último caracter del usuario debe ser un numero", { user });
    }

  }
}

export class Password {

  private static COGNITO_REGEX: RegExp = /^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ])[A-Za-z0-9$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/;


  private constructor(
    public readonly value: string,
  ) {
  }

  static create(password: string): Password {
    return new Password(password);
  }

  public toString() {
    return this.value;
  }

  static validate(password: string) {
    if (!this.COGNITO_REGEX.test(password)) {
      throw IncorrectPasswordFormat.create("La contraseña no cumple con los requisitos de seguridad", { password });
    }

  }

  public isCorrect(password: string) {
    return compareSync(password, this.value);
  }

  static hashPassword(password: string) {
    return hashSync(password, 5);
  }
}