import { Router } from "express";
import { getAllGenres } from "../handlers/genre.handler.js";

const genreRouter = Router();

genreRouter.get("/genres", getAllGenres)

export default genreRouter;
