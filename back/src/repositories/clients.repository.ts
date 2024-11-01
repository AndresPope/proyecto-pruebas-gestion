import { MongoClient } from "../mongo";
import { ClientInput } from "../domain/clients/types";
import { Client } from "../domain/clients/client.model";
import { Pagination } from "../shared";


export async function isNitAlreadyRegistered(nit: string) {
  const client = await MongoClient.exists({ nit });
  return Boolean(client?._id);
}

export async function createMongoClient(clientInput: ClientInput) {
  const client = await MongoClient.create(clientInput.toJson());
  return Client.fromMongo(client);
}

export async function editMongoClient(clientInput: ClientInput, id: string) {
  const client = await MongoClient.findByIdAndUpdate(id, clientInput.toJson(), { new: true });
  if (!client) {
    throw new Error("Client not found");
  }
  return Client.fromMongo(client);
}

export async function deleteMongoClient(id: string) {
  return MongoClient.deleteOne({ _id: id });
}

export async function listMongoClients(pagination: Pagination) {
  const clients = await MongoClient.find().skip(pagination.offset).limit(pagination.limit);
  return clients.map(client => Client.fromMongo(client));
}

export async function isClientRegisteredById(id: string) {
  const client = await MongoClient.exists({ _id: id });
  return Boolean(client?._id);
}