import { AppDataSource } from "../database/dataSource.js";
import { Game } from "../database/entities/game.entity.js";

interface GameFilters {
	genres?: string[];
	tags?: string[];
	platforms?: string[];
	term?: string;
	sort?: string;
}

export async function getGames({
	genres = [],
	tags = [],
	platforms = [],
	term = "",
	sort = "date-new",
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

	switch (sort) {
		case "date-new":
			query.orderBy("game.releaseDate", "DESC");
			break;

		case "date-old":
			query.orderBy("game.releaseDate", "ASC");
			break;

		case "price-ascending":
			query.orderBy("game.price", "ASC");
			break;

		case "price-descending":
			query.orderBy("game.price", "DESC");
			break;

		case "name-az":
			query.orderBy("game.name", "ASC");
			break;

		case "name-za":
			query.orderBy("game.name", "DESC");
			break;

		case "rating":
			query.orderBy("game.rating", "DESC");
			break;
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
