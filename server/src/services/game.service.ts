import { AppDataSource } from "../database/dataSource.js";
import { Game } from "../database/entities/game.entity.js";

interface GameFilters {
	genres?: string[];
	tags?: string[];
	platforms?: string[];
	term?: string;
}

export async function getGames({
	genres = [],
	tags = [],
	platforms = [],
	term = "",
}: GameFilters): Promise<Game[]> {
	const query = AppDataSource.getRepository(Game)
		.createQueryBuilder("game")
		.leftJoinAndSelect("game.tags", "tag")
		.leftJoinAndSelect("game.platforms", "platform")
		.leftJoinAndSelect("game.genres", "genre");

	if (genres.length > 0) {
		query.andWhere("genre.name IN (:...genres)", { genres });
	}

	if (tags.length > 0) {
		query.andWhere("tag.name IN (:...tags)", { tags });
	}

	if (platforms.length > 0) {
		query.andWhere("platform.name IN (:...platforms)", { platforms });
	}

	if (term !== "") {
		query.andWhere("game.name ILIKE :term", { term: `%${term}%` });
	}

	return query.getMany();
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

export async function getGamesByTerm(term: string): Promise<Game[]> {
	return AppDataSource.getRepository(Game)
		.createQueryBuilder("game")
		.where("game.name ILIKE :term", { term: `%${term}%` })
		.getMany();
}
