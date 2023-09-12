import { Router } from "express";
import { formRouter } from "./form.router.js";


export const apiRouter = Router()

apiRouter.use('/form', formRouter)