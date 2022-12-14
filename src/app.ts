import express, { json, Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/Routes";
import { connectDb, disconnectDB } from "./config";

dotenv.config();

const app = express();
app.use(json(), cors());
app.use(router);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close() {
  await disconnectDB();
}

export default app;
