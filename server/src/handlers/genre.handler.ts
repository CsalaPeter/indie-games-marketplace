import { Request, Response } from "express";
import { getGenres } from "../services/genre.service.js";

export async function getAllGenres(request: Request, response: Response) {
	try {
		const genres = await getGenres();
		response.status(200).json(genres);
	} catch (error) {
		response.status(500).json({ error: "Internal Server Error" });
	}
}
