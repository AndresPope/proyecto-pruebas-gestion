import { Request, Response } from "express";
import { RequestHasNoBody } from "../shared";
import jwt from "jsonwebtoken";
import { Password, UserInput, Username } from "../domain";
import { createMongoUser, findMongoUserByUsername, isUsernameTaken } from "../repositories";
import { PasswordIsNotCorrect, UsernameAlreadyExists, UserNotExists } from "../domain/users/error";
import { SECRET_KEY } from "../shared/auth-key";

export async function createUserHandler(req: Request, res: Response) {
  const body = req.body;
  if (!body) {
    throw RequestHasNoBody.create();
  }
  const newUserRequest = UserInput.fromJson(body);

  const isTaken = await isUsernameTaken(newUserRequest.user);
  if (isTaken) {
    throw UsernameAlreadyExists.create();
  }

  Username.validate(newUserRequest.user);
  Password.validate(newUserRequest.password);

  const hashedPassword = Password.hashPassword(newUserRequest.password);

  const newUser = await createMongoUser(newUserRequest.user, hashedPassword);

  res.status(201).json(newUser.toJSON());

}

export async function login(req: Request, res: Response) {
  const body = req.body;
  if (!body) {
    throw RequestHasNoBody.create();
  }
  const userInput = UserInput.fromJson(body);

  const user = await findMongoUserByUsername(userInput.user);
  if (!user) {
    throw UserNotExists.create();
  }

  const isPasswordCorrect = user.password.isCorrect(userInput.password);
  if (!isPasswordCorrect) {
    throw PasswordIsNotCorrect.create();
  }

  const token = jwt.sign({ user: user }, SECRET_KEY, { expiresIn: "7d" });

  res.cookie("access_token", token, { httpOnly: true }).send({ user: user.toJSON(), token });
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("access_token").send({ message: "Logged out" });
}