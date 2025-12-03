import { Router } from "express";
import {
	getProfil,
	loginUser,
	registerUser,
} from "../handlers/user.handler.js";
import { auth } from "../middleware/auth.middleware.js";

const userRoter = Router();

userRoter.post("/register", registerUser);
userRoter.post("/login", loginUser);
userRoter.get("/profile", [auth], getProfil);

export default userRoter;
