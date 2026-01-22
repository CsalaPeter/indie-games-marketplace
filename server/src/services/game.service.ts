import { AppDataSource } from "../database/dataSource.js";
import { Game } from "../database/entities/game.entity.js";

interface GameFilters {
	genres?: string[];
	tags?: string[];
	platforms?: string[];
	term?: string;
	sort?: string;
	page?: number;
	limit?: number;
}

interface CreateGame {
	body: {
		name: string;
		slug: string;
		description: string;
		releaseDate: string;
		price: number;
		tags: string;
		platforms: string;
		genres: string;
	};
	files: {
		coverImage: Express.Multer.File;
		gameFile: Express.Multer.File;
	};
}

export async function getGames({
	genres = [],
	tags = [],
	platforms = [],
	term = "",
	sort = "date-new",
	page = 1,
	limit = 9,
}: GameFilters): Promise<{ data: Game[]; total: number }> {
	const query = AppDataSource.getRepository(Game)
		.createQueryBuilder("games")
		.leftJoinAndSelect("games.tags", "tag")
		.leftJoinAndSelect("games.platforms", "platform")
		.leftJoinAndSelect("games.genres", "genre");

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
		query.andWhere("games.name ILIKE :term", { term: `%${term}%` });
	}

	switch (sort) {
		case "date-new":
			query.orderBy("games.releaseDate", "DESC");
			break;

		case "date-old":
			query.orderBy("games.releaseDate", "ASC");
			break;

		case "price-ascending":
			query.orderBy("games.price", "ASC");
			break;

		case "price-descending":
			query.orderBy("games.price", "DESC");
			break;

		case "name-az":
			query.orderBy("games.name", "ASC");
			break;

		case "name-za":
			query.orderBy("games.name", "DESC");
			break;

		case "rating":
			query.orderBy("games.rating", "DESC");
			break;
	}

	const skip = (page - 1) * limit;
	const [data, total] = await query.skip(skip).take(limit).getManyAndCount();

	return { data, total };
}

export async function getGameBySlug(slug: string): Promise<Game | null> {
	return AppDataSource.getRepository(Game)
		.createQueryBuilder("games")
		.where("games.slug = :slug", { slug })
		.leftJoinAndSelect("games.tags", "tag")
		.leftJoinAndSelect("games.platforms", "platform")
		.leftJoinAndSelect("games.genres", "genre")
		.getOne();
}

export async function getGamesByTerm(term: string): Promise<Game[]> {
	return AppDataSource.getRepository(Game)
		.createQueryBuilder("games")
		.where("game.name ILIKE :term", { term: `%${term}%` })
		.getMany();
}

export async function uploadGame(gameData: CreateGame): Promise<Game> {
	const { body, files } = gameData;

	const tags = JSON.parse(body.tags || "[]").map((id: string) => ({ id }));
	const platforms = JSON.parse(body.platforms || "[]").map((id: string) => ({
		id,
	}));
	const genres = JSON.parse(body.genres || "[]").map((id: string) => ({
		id,
	}));

	const newGame = AppDataSource.getRepository(Game).create({
		name: body.name,
		slug: body.slug,
		description: body.description,
		cardImageUrl: files.coverImage.path,
		filePath: files.gameFile.path,
		releaseDate: new Date(body.releaseDate),
		price: Number(body.price),
		tags,
		platforms,
		genres,
	});
	return await AppDataSource.getRepository(Game).save(newGame);
}
