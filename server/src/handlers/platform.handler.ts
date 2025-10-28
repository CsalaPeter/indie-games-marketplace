import { Request, Response } from "express";
import { getPlatforms } from "../services/platform.service.js";

export async function getAllPlatforms(request: Request, response: Response) {
	try {
		const platforms = await getPlatforms();
		response.status(200).json(platforms);
	} catch (error) {
		response.status(500).json({ error: "Internal Server Error" });
	}
}
