import { Router } from "express";
import { getAllGames, getGame, searchGames } from "../handlers/game.handler.js";

const gameRouter = Router();

gameRouter.get("/", getAllGames);
gameRouter.get("/game/:slug", getGame);
gameRouter.get("/search", searchGames)

export default gameRouter;
