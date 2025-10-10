import { AppDataSource } from "../database/dataSource.js";
import { Tag } from "../database/entities/tag.entity.js";

export async function getTags(): Promise<Tag[]> {
	return AppDataSource.getRepository(Tag)
		.createQueryBuilder("tag")
		.getMany();
}
