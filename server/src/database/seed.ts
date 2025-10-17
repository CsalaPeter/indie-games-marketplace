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

	const allGenres = await genreRepo.find();
	const allPlatforms = await platformRepo.find();
	const allTags = await tagRepo.find();

	const genre = (name: string) => allGenres.find((x) => x.name === name)!;
	const platform = (name: string) =>
		allPlatforms.find((x) => x.name === name)!;
	const tag = (name: string) => allTags.find((x) => x.name === name)!;

	const games = [
		{
			name: "Echoes of Aetheria",
			slug: "echoes-of-aetheria",
			price: 39.99,
			cardImageUrl: "",
			description:
				"Journey through floating continents in a hand-painted world where time itself fractures. Forge bonds, master ancient runes, and decide the fate of Aetheria.",
			releaseDate: new Date("2024-04-11"),
			genres: [genre("Adventure"), genre("RPG")],
			platforms: [platform("Windows"), platform("Mac")],
			tags: [tag("Narrative"), tag("Mythology"), tag("Exploration")],
		},
		{
			name: "Neon Drift: Tokyo Nights",
			slug: "neon-drift-tokyo-nights",
			price: 0,
			cardImageUrl: "",
			description:
				"Race through rain-slicked neon streets of a future Tokyo. Tune your hover car, challenge gangs, and drift your way to underground glory.",
			releaseDate: new Date("2023-10-06"),
			genres: [genre("Racing"), genre("Action")],
			platforms: [platform("Windows")],
			tags: [tag("Arcade"), tag("Retro"), tag("Sci-fi")],
		},
		{
			name: "Ironvale Chronicles",
			slug: "ironvale-chronicles",
			price: 49.99,
			cardImageUrl: "",
			description:
				"An epic fantasy RPG set in a crumbling steampunk empire. Lead a band of outlaws, uncover forbidden magic, and fight for a future forged in iron.",
			releaseDate: new Date("2022-11-22"),
			genres: [genre("RPG"), genre("Adventure")],
			platforms: [platform("Windows"), platform("Linux")],
			tags: [tag("Dark"), tag("Choices Matter"), tag("Dungeon Crawler")],
		},
		{
			name: "Starlight Expanse",
			slug: "starlight-expanse",
			price: 59.99,
			cardImageUrl: "",
			description:
				"Command a small fleet on a journey through a collapsing galaxy. Explore alien worlds, upgrade your ship, and uncover the origins of a dying star.",
			releaseDate: new Date("2024-02-15"),
			genres: [genre("Shooter"), genre("Action")],
			platforms: [platform("Windows"), platform("Mac")],
			tags: [tag("Sci-fi"), tag("FPS"), tag("Exploration")],
		},
		{
			name: "Crimson Reign",
			slug: "crimson-reign",
			price: 34.99,
			cardImageUrl: "",
			description:
				"Rise from exile to reclaim your blood-soaked throne in a dark medieval realm. Every decision costs something—sometimes even your soul.",
			releaseDate: new Date("2023-07-29"),
			genres: [genre("Action"), genre("RPG")],
			platforms: [platform("Windows"), platform("Linux")],
			tags: [tag("Dark"), tag("Gore"), tag("Lovecraftian")],
		},
		{
			name: "Hollowfront",
			slug: "hollowfront",
			price: 44.99,
			cardImageUrl: "",
			description:
				"A haunting survival thriller set in the frozen remains of an arctic colony. Manage dwindling supplies, confront paranoia, and survive the endless night.",
			releaseDate: new Date("2023-03-03"),
			genres: [genre("Survival"), genre("Action")],
			platforms: [platform("Windows"), platform("Mac")],
			tags: [tag("Horror"), tag("Psychological Horror"), tag("Dark")],
		},
		{
			name: "Vanguard Protocol",
			slug: "vanguard-protocol",
			price: 69.99,
			cardImageUrl: "",
			description:
				"Become an elite pilot in a cybernetic war for humanity’s survival. Tactical shooter meets real-time strategy in a high-stakes, neural-synced battlefield.",
			releaseDate: new Date("2025-06-08"),
			genres: [genre("Shooter"), genre("Strategy")],
			platforms: [platform("Windows"), platform("Linux")],
			tags: [tag("Sci-fi"), tag("FPS"), tag("Stealth")],
		},
		{
			name: "Frostborne Saga",
			slug: "frostborne-saga",
			price: 49.99,
			cardImageUrl: "",
			description:
				"Guide your clan through endless winter. Hunt, craft, and build as ancient gods stir beneath the ice. Every dawn is a fight to survive.",
			releaseDate: new Date("2024-12-01"),
			genres: [genre("Adventure"), genre("RPG")],
			platforms: [platform("Windows"), platform("Mac")],
			tags: [tag("Mythology"), tag("Exploration"), tag("Crafting")],
		},
		{
			name: "Ashen Horizon",
			slug: "ashen-horizon",
			price: 59.99,
			cardImageUrl: "",
			description:
				"Terraform a lifeless planet into humanity’s new home. Balance ecosystems, harness storms, and uncover the remnants of an ancient alien race.",
			releaseDate: new Date("2025-01-25"),
			genres: [genre("Simulation"), genre("Strategy")],
			platforms: [platform("Windows"), platform("Linux")],
			tags: [tag("Base Building"), tag("City builder"), tag("Survival")],
		},
		{
			name: "Quantum Requiem",
			slug: "quantum-requiem",
			price: 39.99,
			cardImageUrl: "",
			description:
				"Fight your way through dimensions in a time-bending bullet hell. Every death rewrites reality — and every victory unravels it.",
			releaseDate: new Date("2024-08-09"),
			genres: [genre("Shooter"), genre("Action")],
			platforms: [platform("Windows")],
			tags: [tag("Bullet Hell"), tag("Arcade"), tag("Sci-fi")],
		},
		{
			name: "Warden of the Deep",
			slug: "warden-of-the-deep",
			price: 19.99,
			cardImageUrl: "",
			description:
				"Dive into an endless ocean of secrets. Discover lost civilizations, befriend sea spirits, and uncover the truth buried beneath the waves.",
			releaseDate: new Date("2022-09-15"),
			genres: [genre("Adventure"), genre("Simulation")],
			platforms: [platform("Windows"), platform("Mac")],
			tags: [tag("Exploration"), tag("Cozy"), tag("Casual")],
		},
		{
			name: "Solaris Reborn",
			slug: "solaris-reborn",
			price: 24.99,
			cardImageUrl: "",
			description:
				"Reclaim a shattered solar empire in this narrative-driven space opera. Forge alliances, betray friends, and determine the future of light itself.",
			releaseDate: new Date("2025-09-17"),
			genres: [genre("Action"), genre("RPG")],
			platforms: [platform("Windows"), platform("Linux")],
			tags: [tag("Sci-fi"), tag("Narrative"), tag("Choices Matter")],
		},
	];

	for (const game of games) {
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
