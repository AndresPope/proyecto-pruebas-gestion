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

export type ClientInput = Omit<TClient, "id">;
