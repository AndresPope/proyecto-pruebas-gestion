import * as mongoose from "mongoose";
import express from "express";
import { authMiddleware, errorHandler } from "./shared";
import { json } from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { asyncWrapper } from "./shared";
import {
  createClientHandler,
  createUserHandler,
  deleteClientHandler,
  editClientHandler,
  listClientsHandler,
  login, logout,
} from "./handlers";

const MONGO_URL = "mongodb://acuasmart-mongo-user:acuasmart-mongo-password@localhost:27017" as const;
const PORT = 4000 as const;

const app = express();
app.use(cors({
  origin: "http://localhost:5173",  // Tu origen frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.use(json());
app.use(cookieParser());
//@ts-ignore
app.use(authMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/create-user", asyncWrapper(createUserHandler));
app.post("/login", asyncWrapper(login));
app.post("/logout", asyncWrapper(logout));
app.post("/create-client", asyncWrapper(createClientHandler));
app.put("/edit-client", asyncWrapper(editClientHandler));
app.post("/delete-client", asyncWrapper(deleteClientHandler));
app.get("/list-clients", asyncWrapper(listClientsHandler));
//@ts-ignore
app.use(errorHandler);


mongoose.connect(MONGO_URL, {
  dbName: "TnM-db",
}).then(
  () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}`);
    });
  },
);



