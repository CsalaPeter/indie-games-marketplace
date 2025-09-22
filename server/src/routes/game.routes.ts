import { Router } from "express";
import { getAllGames, getGame } from "../handlers/game.handler.js";

const gameRouter = Router();

gameRouter.get("/", getAllGames);
gameRouter.get("/game/:slug", getGame);

export default gameRouter;
