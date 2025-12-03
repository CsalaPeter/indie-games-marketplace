import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export interface JwtPayload {
	username: string;
	iat: number;
	exp: number;
}

export function auth(request: Request, response: Response, next: NextFunction) {
	const authHeader = request.headers.authorization;
	let token: string = "";

	if (!authHeader) {
		return response.status(401).json({ message: "Unauthorized" });
	}

	if (authHeader && authHeader.startsWith("Bearer ")) {
		token = authHeader.split(" ")[1];
	}

	if (!token) {
		return response.status(401).json({ message: "No token provided" });
	}

	try {
		const jwtPayload = jwt.verify(token, process.env.JWT_SECRET!);
		response.locals.JwtPayload = jwtPayload;
		next();
	} catch (error) {
		return response
			.status(401)
			.json({ message: "Invalid or expired token" });
	}
}
