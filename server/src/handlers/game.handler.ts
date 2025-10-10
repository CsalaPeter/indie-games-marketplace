import { Request, Response } from "express";
import { getGames, getGameBySlug, getGamesByTerm } from "../services/game.service.js";
import { ParsedQs } from "qs";

function getQueryAsStrings(
	param: string | ParsedQs | (string | ParsedQs)[] | undefined
): string[] {
	if (!param) {
		return [];
	}

	const rawArray = Array.isArray(param) ? param : [param];

	return rawArray.filter((item): item is string => typeof item === 'string');
}

export async function getAllGames(request: Request, response: Response) {
	try {
		const { genres, tags } = request.query;

		const genreFilters = getQueryAsStrings(genres);
		const tagFilters = getQueryAsStrings(tags);

		const games = await getGames({ genres: genreFilters, tags: tagFilters })
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
