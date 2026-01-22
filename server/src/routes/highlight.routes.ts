import { Router } from "express";
import { getAllHighlights } from "../handlers/highlight.handler.js";

const highlightRouter = Router();

highlightRouter.get("/highlights", getAllHighlights);

export default highlightRouter;
