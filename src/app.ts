import express, { Express } from "express";
import "express-async-errors";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import { dbConnect } from "./config/db.config";

import router from "./routes/v1";

dbConnect()
const app: Express = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join("public")));
app.use(cors());

app.use("/v1", router);

export default app;
