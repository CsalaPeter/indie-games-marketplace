import { AppDataSource } from "../database/dataSource.js";
import { Highlight } from "../database/entities/highlight.entity.js";

export async function getHighlights(): Promise<Highlight[]> {
	return AppDataSource.getRepository(Highlight).find();
}
