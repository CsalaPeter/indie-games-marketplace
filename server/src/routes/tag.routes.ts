import { Router } from "express";
import { getAllTags } from "../handlers/tag.handler.js";

const tagRouter = Router();

tagRouter.get("/tags", getAllTags)

export default tagRouter;
