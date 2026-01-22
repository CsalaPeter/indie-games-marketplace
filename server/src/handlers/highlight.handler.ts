import { Request, Response } from "express";
import { getHighlights } from "../services/highlight.service.js";

export async function getAllHighlights(_request: Request, response: Response) {
	try {
		const highlights = await getHighlights();
		response.status(200).json(highlights);
	} catch (error) {
		response.status(500).json({ error: "Internal Server Error" });
	}
}
