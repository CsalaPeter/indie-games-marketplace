import { Router } from "express";
import multer from "multer";
import {
	getAllGames,
	getGame,
	createGame,
	searchGames,
} from "../handlers/game.handler.js";
import { upload } from "../middleware/files.middleware.js";

const gameRouter = Router();

gameRouter.get("/games", getAllGames);
gameRouter.get("/game/:slug", getGame);
gameRouter.get("/search", searchGames);
gameRouter.post("/upload", (request, response, _next) => {
	upload.fields([
		{ name: "coverImage", maxCount: 1 },
		{ name: "gameFile", maxCount: 1 },
	])(request, response, (error) => {
		if (error instanceof multer.MulterError) {
			return response
				.status(400)
				.json({ message: `Upload error: ${error.message}` });
		} else if (error) {
			return response.status(400).json({ message: error.message });
		}
		createGame(request, response);
	});
});

export default gameRouter;
