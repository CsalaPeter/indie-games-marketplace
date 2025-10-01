import { Request, Response } from "express";
import { getGames, getGameBySlug, getGamesByTerm } from "../services/game.service.js";

export async function getAllGames(request: Request, response: Response) {
	try {
		const games = await getGames()
		response.status(200).json(games)
	} catch (error) {
		console.error("Error fetching games:", error);
		response.status(500).json({ message: "Internal server error" });
	}
}

export async function getGame(request: Request, response: Response) {
	try {
		const game = await getGameBySlug(request.params.slug)
		response.status(200).json(game)
	} catch (error) {
		console.error("Error fetching game:", error);
		response.status(500).json({ message: "Internal server error" });
	}
}

export async function searchGames(request: Request, response: Response) {
	try {
		const games = await getGamesByTerm(request.query.q as string)
		response.status(200).json(games)
	} catch (error) {
		console.error("Error fetching game:", error);
		response.status(500).json({ message: "Internal server error" });
	}
}
