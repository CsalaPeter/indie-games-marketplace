import { Router } from "express";
import { registerUser } from "../handlers/user.handler.js";

const userRoter = Router();

userRoter.post("/register", registerUser);

export default userRoter;
