import { Router } from "express";
import { getAllGames } from "../handlers/game.handler.js";

const gameRouter = Router();

gameRouter.get("/", getAllGames);

export default gameRouter;
