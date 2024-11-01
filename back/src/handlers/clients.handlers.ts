import { Request, Response } from "express";
import { Pagination, PaginationError, RequestBodyIncomplete, RequestHasNoBody } from "../shared";
import { Birthdate, ClientInput, Email, NamePartsData, NumericalData } from "../domain/clients/types";
import {
  createMongoClient,
  deleteMongoClient,
  editMongoClient, isClientRegisteredById,
  isNitAlreadyRegistered,
  listMongoClients,
} from "../repositories";
import { NitAlreadyRegistered, NitNotRegistered } from "../domain/clients/error";

export async function createClientHandler(req: Request, res: Response) {
  const body = req.body;
  if (!body) {
    throw RequestHasNoBody.create();
  }
  const clientInput = ClientInput.fromJson(body);
  const nitAlreadyRegistered = await isNitAlreadyRegistered(clientInput.nit);
  if (nitAlreadyRegistered) {
    throw NitAlreadyRegistered.create({ nit: clientInput.nit });
  }
  validateClientInput(clientInput);
  const client = await createMongoClient(clientInput);
  res.status(201).json(client.toJSON());
}

export async function editClientHandler(req: Request, res: Response) {
  const body = req.body;
  if (!body) {
    throw RequestHasNoBody.create();
  }

  const { input, id } = body;
  if (!id || !input) {
    throw RequestBodyIncomplete.create();
  }
  const clientInput = ClientInput.fromJson(input);
  const nitAlreadyRegistered = await isNitAlreadyRegistered(clientInput.nit);
  if (!nitAlreadyRegistered) {
    throw NitNotRegistered.create({ nit: clientInput.nit });
  }
  validateClientInput(clientInput);
  const client = await editMongoClient(clientInput, id);
  res.status(201).json(client.toJSON());
}

export async function deleteClientHandler(req: Request, res: Response) {
  const body = req.body;
  console.log("=>(clients.handlers.ts:50) body", body);
  if (!body) {
    throw RequestHasNoBody.create();
  }

  const { id } = body;
  if (!id) {
    throw RequestBodyIncomplete.create();
  }

  const clientExists = await isClientRegisteredById(id);
  if (!clientExists) {
    throw NitNotRegistered.create({ nit: id });
  }

  const result = await deleteMongoClient(id);
  if (!result.acknowledged) {
    res.status(404).send();
  }

  res.status(204).send();
}

export async function listClientsHandler(req: Request, res: Response) {
  const { limit, offset } = req.query;
  if (!limit || !offset) {
    throw RequestBodyIncomplete.create();
  }

  if (typeof limit !== "string" || typeof offset !== "string") {
    throw PaginationError.create("Los parametros limit y offset deben ser de tipo string", {
      limit: typeof limit,
      offset: typeof offset,
    });
  }


  const pagination = Pagination.from({
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  const clients = await listMongoClients(pagination);
  res.status(200).json(clients.map(client => client.toJSON()));

}

function validateClientInput(clientInput: ClientInput) {
  NumericalData.validate(clientInput.nit, "Nit");
  NumericalData.validate(clientInput.phone, "Telefono");
  NamePartsData.validate(clientInput.firstName, "Primer Nombre");
  if (clientInput.secondName) {
    NamePartsData.validate(clientInput.secondName, "Segundo Nombre");
  }
  NamePartsData.validate(clientInput.firstLastName, "Primer Apellido");
  NamePartsData.validate(clientInput.secondLastName, "Segundo Apellido");
  Birthdate.validate(clientInput.birthdate);
  Email.validate(clientInput.email);
}