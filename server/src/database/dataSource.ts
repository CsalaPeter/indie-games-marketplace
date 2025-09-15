import { DataSource } from "typeorm";
import { Game } from "./entities/game.entity.js";
import { Tag } from "./entities/tag.entity.js";
import { Platform } from "./entities/platform.entity.js";
import { Genre } from "./entities/genre.entity.js";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "postgres",
	database: "postgres",
	synchronize: true,
	logging: true,
	entities: [Game, Tag, Platform, Genre]
});
