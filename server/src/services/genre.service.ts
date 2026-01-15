import { AppDataSource } from "../database/dataSource.js";
import { Genre } from "../database/entities/genre.entity.js";

export async function getGenres(): Promise<Genre[]> {
	return AppDataSource.getRepository(Genre)
		.createQueryBuilder("genres")
		.getMany();
}
