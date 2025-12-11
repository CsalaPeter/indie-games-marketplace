import { Router } from "express";
import {
	getProfile,
	loginUser,
	logoutUser,
	registerUser,
} from "../handlers/user.handler.js";
import { auth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { LoginSchema, RegisterSchema } from "../schemas/auth.schema.js";

const userRoter = Router();

userRoter.post("/register", validate(RegisterSchema), registerUser);
userRoter.post("/login", validate(LoginSchema), loginUser);
userRoter.post("/logout", logoutUser);
userRoter.get("/profile", [auth], getProfile);

export default userRoter;
