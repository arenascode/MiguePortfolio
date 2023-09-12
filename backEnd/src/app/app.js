import express from "express";
import { envConfig } from "../config/env.config.js";
import { apiRouter } from "../routes/api.router.js";
import cors from "cors"
export const app = express();
console.log(envConfig.parsed);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/api", apiRouter);
