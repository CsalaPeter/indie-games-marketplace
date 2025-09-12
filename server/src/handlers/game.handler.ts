import { Request, Response } from "express";
import { getGames } from "../services/game.service.js";

export async function getAllGames(request: Request, response: Response) {
	try {
		const games = await getGames()
		response.status(200).json(games)
	} catch (error) {
		console.error("Error fetching games:", error);
		response.status(500).json({ message: "Internal server error" });
	}
}
