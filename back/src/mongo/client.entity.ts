import { HydratedDocument, model, Model, Schema } from "mongoose";

export interface IClient {
  nit: string;
  firstName: string;
  secondName?: string;
  firstLastName: string;
  secondLastName: string;
  birthdate: string;
  phone: string;
  email: string;
}

export type ClientDocument = HydratedDocument<IClient>;

const clientSchema = new Schema<IClient>({
  nit: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
  },
  firstLastName: {
    type: String,
    required: true,
  },
  secondLastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
    required: true,
  },
});

export interface ClientModel extends Model<IClient> {
}

export const MongoClient = model<IClient>("client", clientSchema, "clients") as ClientModel;