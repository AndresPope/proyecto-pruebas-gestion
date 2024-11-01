import { ClientDocument } from "../../mongo";
import { DateTimeFormatter, LocalDate } from "@js-joda/core";

export type TClient = {
  id: string;
  nit: string;
  firstName: string;
  secondName?: string;
  firstLastName: string;
  secondLastName: string;
  birthdate: string;
  phone: string;
  email: string;
}

export class Client {

  private constructor(
    public readonly id: string,
    public readonly nit: string,
    public readonly firstName: string,
    public readonly firstLastName: string,
    public readonly secondLastName: string,
    public readonly birthdate: LocalDate,
    public readonly phone: string,
    public readonly email: string,
    public readonly secondName?: string,
  ) {
  }

  static fromMongo(document: ClientDocument): Client {
    const birthdate = LocalDate.parse(document.birthdate);
    return new Client(
      document._id.toString(),
      document.nit,
      document.firstName,
      document.firstLastName,
      document.secondLastName,
      birthdate,
      document.phone,
      document.email,
      document.secondName,
    );
  }

  public toJSON(): TClient {
    return {
      id: this.id.toString(),
      nit: this.nit,
      firstName: this.firstName,
      secondName: this.secondName,
      firstLastName: this.firstLastName,
      secondLastName: this.secondLastName,
      birthdate: DateTimeFormatter.ISO_LOCAL_DATE.format(this.birthdate),
      phone: this.phone,
      email: this.email,
    };
  }


}