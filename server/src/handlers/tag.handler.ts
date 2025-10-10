import { Request, Response } from "express";
import { getTags } from "../services/tag.service.js";

export async function getAllTags(request: Request, response: Response) {
	try {
		const tags = await getTags();
		response.status(200).json(tags);
	} catch (error) {
		response.status(500).json({ error: "Internal Server Error" });
	}
}
