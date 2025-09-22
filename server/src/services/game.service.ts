import { AppDataSource } from "../database/dataSource.js";
import { Game } from "../database/entities/game.entity.js";

export async function getGames(): Promise<Game[]> {
	return AppDataSource.getRepository(Game)
		.createQueryBuilder("game")
		.leftJoinAndSelect("game.tags", "tag")
		.leftJoinAndSelect("game.platforms", "platform")
		.leftJoinAndSelect("game.genres", "genre")
		.getMany();
}

export async function getGameBySlug(slug: string): Promise<Game | null> {
	return AppDataSource.getRepository(Game)
		.createQueryBuilder("game")
		.where("game.slug = :slug", { slug })
		.leftJoinAndSelect("game.tags", "tag")
		.leftJoinAndSelect("game.platforms", "platform")
		.leftJoinAndSelect("game.genres", "genre")
		.getOne();
}
