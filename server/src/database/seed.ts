import { AppDataSource } from "./dataSource.js";
import { Game } from "./entities/game.entity.js";
import { Genre } from "./entities/genre.entity.js";
import { Platform } from "./entities/platform.entity.js";
import { Tag } from "./entities/tag.entity.js";

async function seed() {
	const dataSource = await AppDataSource.initialize();
	const gameRepo = dataSource.getRepository(Game);
	const genreRepo = dataSource.getRepository(Genre);
	const platformRepo = dataSource.getRepository(Platform);
	const tagRepo = dataSource.getRepository(Tag);

	console.log("🌱 Starting seed...");

	const genres = [
		"Adventure",
		"Action",
		"Sports",
		"Simulation",
		"Platformers",
		"RPG",
		"Shooter",
		"Racing",
		"Strategy",
		"Puzzle",
		"Casual",
		"Survival",
	];

	for (const name of genres) {
		const exists = await genreRepo.findOne({ where: { name } });
		if (!exists) {
			await genreRepo.save(
				genres.map((genre) => genreRepo.create({ name: genre })),
			);
		}
	}

	console.log("✅ Genres created!");

	const platforms = ["Windows", "Linux", "Mac"];

	for (const name of platforms) {
		const exists = await platformRepo.findOne({ where: { name } });
		if (!exists) {
			await platformRepo.save(
				platforms.map((paltform) =>
					platformRepo.create({ name: paltform }),
				),
			);
		}
	}

	console.log("✅ platforms created!");

	const tags = [
		"Arcade",
		"Base Building",
		"Beat 'em up",
		"Bullet Hell",
		"Choices Matter",
		"City builder",
		"Classic",
		"Cooking",
		"Cozy",
		"Crafting",
		"Dark",
		"Dating Sim",
		"Dungeon Crawler",
		"Education",
		"Exploration",
		"FPS",
		"Female Protagonist",
		"Gore",
		"Historical",
		"Horror",
		"Isometric",
		"Lovecraftian",
		"Mystery",
		"Mythology",
		"Narrative",
		"Parody",
		"Psychological Horror",
		"Retro",
		"Roguelike",
		"Sci-fi",
		"Stealth",
		"Visual Novel",
	];

	for (const name of tags) {
		const exists = await tagRepo.findOne({ where: { name } });
		if (!exists) {
			await tagRepo.save(
				tags.map((tag) => tagRepo.create({ name: tag })),
			);
		}
	}

	console.log("✅ Tags created!");

	function randomItem<T>(array: T[]): T {
		return array[Math.floor(Math.random() * array.length)];
	}

	function slugify(name: string): string {
		return name
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/[^a-z0-9-]/g, "");
	}

	function generateRandomGames(count: number) {
		const adjectives = [
			"Ancient",
			"Blazing",
			"Crimson",
			"Dark",
			"Eternal",
			"Fallen",
			"Galactic",
			"Golden",
			"Infinite",
			"Lost",
			"Neon",
			"Phantom",
			"Sacred",
			"Shadow",
			"Shattered",
			"Silent",
			"Silver",
		];

		const nouns = [
			"Chronicles",
			"City",
			"Depths",
			"Echoes",
			"Empire",
			"Expanse",
			"Frontier",
			"Ghosts",
			"Heroes",
			"Horizon",
			"Kingdom",
			"Legends",
			"Odyssey",
			"Realm",
			"Rebellion",
			"Saga",
			"Sentinel",
			"Town",
			"Voyager",
		];

		const descriptions = [
			"A gripping journey through unknown worlds.",
			"Fight, explore, and forge your destiny.",
			"Uncover secrets hidden for centuries.",
			"Survival depends on choices and sacrifice.",
			"Challenge powerful foes in a world on the edge.",
			"Every decision shapes the fate of the realm.",
		];

		const games = [];

		for (let i = 0; i < count; i++) {
			const name = `${randomItem(adjectives)} ${randomItem(nouns)}`;
			const price = parseFloat((Math.random() * 60).toFixed(2));
			const releaseDate = new Date(
				2000 + Math.floor(Math.random() * 25),
				Math.floor(Math.random() * 12),
				1 + Math.floor(Math.random() * 28),
			);

			games.push({
				name,
				slug: slugify(name),
				price,
				cardImageUrl: "",
				filePath: "uploads/files",
				description: randomItem(descriptions),
				releaseDate,
				genres: [randomItem(allGenres), randomItem(allGenres)],
				platforms: [randomItem(allPlatforms), randomItem(allPlatforms)],
				tags: [
					randomItem(allTags),
					randomItem(allTags),
					randomItem(allTags),
					randomItem(allTags),
				],
			});
		}

		return games;
	}

	const allGenres = await genreRepo.find();
	const allPlatforms = await platformRepo.find();
	const allTags = await tagRepo.find();

	const randomGames = generateRandomGames(120);

	for (const game of randomGames) {
		const exists = await gameRepo.findOne({ where: { name: game.name } });
		if (!exists) {
			await gameRepo.save(gameRepo.create(game));
		}
	}

	await dataSource.destroy();
	console.log("🎉 Seeding complete!");
}

seed().catch((err) => {
	console.error("Seed error:", err);
	process.exit(1);
});
