import { Password, Username } from "./types";
import { UserDocument } from "../../mongo";

export type TUser = {
  id: string;
  username: string;
}

export class User {

  private constructor(
    public readonly id: string,
    public readonly username: Username,
    public readonly password: Password,
  ) {
  }

  static fromMongo(document: UserDocument): User {
    const username = Username.create(document.username);
    const pwd = Password.create(document.password);
    return new User(document._id.toString(), username, pwd);
  }

  public toJSON(): TUser {
    return {
      id: this.id.toString(),
      username: this.username.toString(),
    };
  }


}