import { Router } from "express";
import {
	getProfile,
	loginUser,
	logoutUser,
	registerUser,
} from "../handlers/user.handler.js";
import { auth } from "../middleware/auth.middleware.js";

const userRoter = Router();

userRoter.post("/register", registerUser);
userRoter.post("/login", loginUser);
userRoter.post("/logout", logoutUser);
userRoter.get("/profile", [auth], getProfile);

export default userRoter;
