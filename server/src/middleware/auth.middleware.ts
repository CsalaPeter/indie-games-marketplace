import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function auth(request: Request, response: Response, next: NextFunction) {
	const token = request.cookies.token;

	if (!token) {
		return response.status(401).send("Access denied. No token provided.");
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET!);
		request.user = user;
		next();
	} catch (error) {
		response.clearCookie("token");
		return response
			.status(401)
			.json({ message: "Invalid or expired token" })
			.redirect("/");
	}
}
