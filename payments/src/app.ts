import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
  logRequest,
} from "@fuzzyrock/common";
import { createChargeRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // cookie is only shared when someone is making
    // a request to our server via https connection
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

app.use(logRequest);

app.use(createChargeRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };