import { z } from "zod";
import {
  BirthdateIsNotValid,
  EmailIsNotValid,
  NameIsNotValid,
  NumericalDataIsNotValid,
  NumericalDataLengthIsNotValid,
} from "./error";
import { DateTimeFormatter, DateTimeParseException, LocalDate } from "@js-joda/core";

export class ClientInput {
  private static SCHEMA = z.object({
    nit: z.string(),
    firstName: z.string(),
    secondName: z.string().optional(),
    firstLastName: z.string(),
    secondLastName: z.string(),
    birthdate: z.string(),
    phone: z.string(),
    email: z.string(),
  });

  constructor(
    public readonly nit: string,
    public readonly firstName: string,
    public readonly firstLastName: string,
    public readonly secondLastName: string,
    public readonly birthdate: string,
    public readonly phone: string,
    public readonly email: string,
    public readonly secondName?: string,
  ) {
  }

  static fromJson(json: unknown): ClientInput {
    const parsed = ClientInput.SCHEMA.parse(json);
    return new ClientInput(parsed.nit, parsed.firstName, parsed.firstLastName, parsed.secondLastName, parsed.birthdate, parsed.phone, parsed.email, parsed.secondName);
  }


  public toJson() {
    return {
      nit: this.nit,
      firstName: this.firstName,
      secondName: this.secondName,
      firstLastName: this.firstLastName,
      secondLastName: this.secondLastName,
      birthdate: this.birthdate,
      phone: this.phone,
      email: this.email,
    };
  }


}

export class NumericalData {
  static validate(number: string, numericalType: "Nit" | "Telefono") {

    if (number.length !== 10) {
      throw NumericalDataLengthIsNotValid.create(numericalType, { currentLength: number.length, expectedLength: 10 });
    }

    if (Number.isNaN(Number(number))) {
      throw NumericalDataIsNotValid.create(numericalType, { number });
    }

  }
}

export class NamePartsData {
  private static NAME_REGEX: RegExp = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ]+$/;

  static validate(name: string, namePart: string) {
    if (!this.NAME_REGEX.test(name)) {
      throw NameIsNotValid.create(namePart, { name });
    }
  }
}

export class Birthdate {

  private static isValidLocalDate(dateStr: string, format: string = "yyyy-MM-dd"): boolean {
    try {
      const formatter = DateTimeFormatter.ofPattern(format);
      LocalDate.parse(dateStr, formatter);
      return true;
    } catch (error) {
      if (error instanceof DateTimeParseException) {
        return false;
      }
      throw error;
    }
  }


  static validate(date: string) {

    const isValid = this.isValidLocalDate(date);
    if (!isValid) {
      throw BirthdateIsNotValid.create("La fecha de nacimiento no tiene un formato valido", {
        formatExpected: "yyyy-MM-dd",
        provided: date,
      });
    }

    const parsed = LocalDate.parse(date);

    if (parsed.isEqual(LocalDate.now())) {
      throw BirthdateIsNotValid.create("La fecha de nacimiento no puede ser igual a la fecha actual", {
        date: date,
      });
    }

    if (parsed.isAfter(LocalDate.now())) {
      throw BirthdateIsNotValid.create("La fecha de nacimiento no puede ser mayor a la fecha actual", {
        date: date,
      });
    }

    if (parsed.isAfter(LocalDate.now().minusYears(18))) {
      throw BirthdateIsNotValid.create("El cliente debe ser mayor de edad", {
        date: date,
      });
    }


  }
}

export class Email {

  private static SCHEMA = z.string().email();

  static validate(email: string) {
    const isValid = this.SCHEMA.safeParse(email);
    if (!isValid.success) {
      throw EmailIsNotValid.create({ email });
    }
  }

}

