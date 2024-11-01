import mongoose, { Model, Schema, HydratedDocument } from "mongoose";

export interface IUser {
  username: string;
  password: string;
}

export type UserDocument = HydratedDocument<IUser>;

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
);

export interface UserModel extends Model<IUser> {
}

export const MongoUser = mongoose.model<IUser>("user", userSchema, "users") as UserModel;

