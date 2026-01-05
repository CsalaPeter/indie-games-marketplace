import { Request, response, Response } from "express";
import {
	getGames,
	getGameBySlug,
	getGamesByTerm,
	uploadGame,
} from "../services/game.service.js";
import { ParsedQs } from "qs";

function getQueryAsStrings(
	param: string | ParsedQs | (string | ParsedQs)[] | undefined,
): string[] {
	if (!param) {
		return [];
	}

	const rawArray = Array.isArray(param) ? param : [param];

	return rawArray.filter((item): item is string => typeof item === "string");
}

export async function getAllGames(request: Request, response: Response) {
	try {
		const { genres, tags, platform, term, sort, page, limit } =
			request.query;

		const genreFilters = getQueryAsStrings(genres);
		const tagFilters = getQueryAsStrings(tags);
		const platformFilters = getQueryAsStrings(platform);
		const termFilter = getQueryAsStrings(term)[0] ?? "";
		const sortOrder = getQueryAsStrings(sort)[0] ?? "";
		const pageNumber = Number(getQueryAsStrings(page)[0] ?? 1);
		const limitNumber = Number(getQueryAsStrings(limit)[0] ?? 9);

		const games = await getGames({
			genres: genreFilters,
			tags: tagFilters,
			platforms: platformFilters,
			term: termFilter,
			sort: sortOrder,
			page: pageNumber,
			limit: limitNumber,
		});
		response.status(200).json({
			data: games.data,
			total: games.total,
			page: pageNumber,
			pages: Math.ceil(games.total / limitNumber),
		});
	} catch (error) {
		console.error("Error fetching games:", error);
		response.status(500).json({ message: "Internal server error" });
	}
}

export async function getGame(request: Request, response: Response) {
	try {
		const game = await getGameBySlug(request.params.slug);
		response.status(200).json(game);
	} catch (error) {
		console.error("Error fetching game:", error);
		response.status(500).json({ message: "Internal server error" });
	}
}

export async function searchGames(request: Request, response: Response) {
	try {
		const games = await getGamesByTerm(request.query.q as string);
		response.status(200).json(games);
	} catch (error) {
		console.error("Error fetching game:", error);
		response.status(500).json({ message: "Internal server error" });
	}
}

export async function postGame(request: Request, response: Response) {
	try {
		const files = request.files as {
			[fieldname: string]: Express.Multer.File[];
		};
		const cardImage = files["coverImage"]?.[0];
		const gameFile = files["gameFile"]?.[0];

		if (!cardImage || !gameFile) {
			return response
				.status(400)
				.json({ message: "Missing required files" });
		}

		const gamaData = {
			...request.body,
			cardImageUrl: cardImage.path,
			filePath: gameFile.path,
		};
		await uploadGame(gamaData);
		response.status(201).json({ message: "Game uploaded successfully" });
	} catch (error) {
		console.error("Error uploading game:", error);
		response.status(500).json({ message: "internal server error" });
	}
}
