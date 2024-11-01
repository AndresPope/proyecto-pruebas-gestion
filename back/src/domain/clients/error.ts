import { ApplicationError, JSONObject } from "../../shared";


export class NumericalDataLengthIsNotValid extends ApplicationError {

  static create(numericalType: "Nit" | "Telefono", metadata?: JSONObject): NumericalDataLengthIsNotValid {
    return new NumericalDataLengthIsNotValid(this.name, "BUSINESS_ERROR", `La longitud del ${numericalType} no es correcta`, metadata);
  }
}

export class NumericalDataIsNotValid extends ApplicationError {

  static create(numericalType: "Nit" | "Telefono", metadata?: JSONObject): NumericalDataIsNotValid {
    return new NumericalDataIsNotValid(this.name, "BUSINESS_ERROR", `El ${numericalType} debe contener solo caracteres numericos`, metadata);
  }
}

export class NitAlreadyRegistered extends ApplicationError {

  static create(metadata?: JSONObject): NitAlreadyRegistered {
    return new NitAlreadyRegistered(this.name, "BUSINESS_ERROR", "El NIT ya se encuentra registrado", metadata);
  }
}

export class NitNotRegistered extends ApplicationError {

  static create(metadata?: JSONObject): NitNotRegistered {
    return new NitNotRegistered(this.name, "BUSINESS_ERROR", "El NIT no se encuentra registrado", metadata);
  }
}

export class NameIsNotValid extends ApplicationError {

  static create(namePart: string, metadata?: JSONObject): NameIsNotValid {
    return new NameIsNotValid(this.name, "BUSINESS_ERROR", `El ${namePart} no es valido`, metadata);
  }
}

export class BirthdateIsNotValid extends ApplicationError {

  static create(msg: string, metadata?: JSONObject): BirthdateIsNotValid {
    return new BirthdateIsNotValid(this.name, "BUSINESS_ERROR", msg, metadata);
  }
}

export class EmailIsNotValid extends ApplicationError {

  static create(metadata?: JSONObject): EmailIsNotValid {
    return new EmailIsNotValid(this.name, "BUSINESS_ERROR", "El email no tiene un formato valido", metadata);
  }

}

