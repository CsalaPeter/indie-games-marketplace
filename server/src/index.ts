import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./database/dataSource.js";
import gameRouter from "./routes/game.routes.js";

const app = express();
const port = 3000;

AppDataSource.initialize()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});

		app.use("/api/games", gameRouter)
	})
	.catch((error) => {
		console.log("Error during Data Source initialization", error);
	});
