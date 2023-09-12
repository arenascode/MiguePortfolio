import { Router } from "express";
import { handlePostForm } from "../controllers/form.controller.js";

export const formRouter = Router()

formRouter.post('/', handlePostForm)