import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import "reflect-metadata";
import { AppDataSource } from "./database/dataSource.js";
import gameRouter from "./routes/game.routes.js";
import genreRouter from "./routes/genre.routes.js";
import tagRouter from "./routes/tag.routes.js";
import platformRouter from "./routes/platform.routes.js";
import userRoter from "./routes/user.routes.js";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

AppDataSource.initialize()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});

		app.use("/api/", [
			gameRouter,
			genreRouter,
			tagRouter,
			platformRouter,
			userRoter,
		]);
	})
	.catch((error) => {
		console.log("Error during Data Source initialization", error);
	});
