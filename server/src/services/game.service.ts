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
