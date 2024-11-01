import { MongoUser } from "../mongo";
import { UserInput, User } from "../domain";

export async function createMongoUser(username: string, hashedPassword: string): Promise<User> {
  const mongoUser = await MongoUser.create({ username, password: hashedPassword });
  return User.fromMongo(mongoUser);
}

export async function isUsernameTaken(username: string): Promise<boolean> {
  const mongoUser = await MongoUser.exists({ username });
  return Boolean(mongoUser?._id);
}

export async function listMongoUsers(): Promise<User[]> {
  const mongoUsers = await MongoUser.find();
  return mongoUsers.map(User.fromMongo);
}

export async function findMongoUserByUsername(username: string): Promise<User | null> {
  const mongoUser = await MongoUser.findOne({ username });
  return mongoUser ? User.fromMongo(mongoUser) : null;
}
