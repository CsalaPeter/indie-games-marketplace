import { Router } from "express";
import { getAllPlatforms } from "../handlers/platform.handler.js";

const platformRouter = Router();

platformRouter.get("/platforms", getAllPlatforms);

export default platformRouter;
