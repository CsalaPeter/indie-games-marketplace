import { DataSource } from "typeorm";
import { Game } from "./entities/game.entity.js";
import { Tag } from "./entities/tag.entity.js";
import { Platform } from "./entities/platform.entity.js";
import { Genre } from "./entities/genre.entity.js";
import { User } from "./entities/user.entity.js";
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

export const AppDataSource = new DataSource({
	type: "postgres",
	host: DB_HOST,
	port: parseInt(DB_PORT || "5432"),
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_DATABASE,
	synchronize: true,
	logging: true,
	entities: [Game, Tag, Platform, Genre, User],
});
