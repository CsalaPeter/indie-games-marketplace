import { Request, Response } from "express";
import { encrypt } from "../util/util.js";
import { createUser, findByEmail, findUser } from "../services/user.service.js";
import { User } from "../database/entities/user.entity.js";
import { LoginDto } from "../dto/user.dto.js";

export async function registerUser(
	request: Request<{}, {}, User>,
	response: Response,
) {
	const { userName, email, password, role } = request.body;

	try {
		const existingUser = await findByEmail(email);
		if (existingUser) {
			return response
				.status(409)
				.json({ message: "Email already in use" });
		}

		const hasedPassword = encrypt.encryptPassword(password);

		const user = new User();
		user.userName = userName;
		user.email = email;
		user.password = hasedPassword;
		user.role = role;

		await createUser(user);

		return response
			.status(201)
			.json({ message: "User registered successfully" });
	} catch (error) {
		return response.status(500).json({ error: "Internal Server Error" });
	}
}

export async function loginUser(
	request: Request<{}, {}, LoginDto>,
	response: Response,
) {
	const { email, password } = request.body;

	try {
		if (!email || !password) {
			return response
				.status(400)
				.json({ message: "Username and password are required" });
		}

		const user = await findByEmail(email);

		if (!user) {
			return response
				.status(401)
				.json({ message: "Invalid credentials" });
		}

		const isPasswordValid = encrypt.comparePassword(
			password,
			user!.password,
		);

		if (!isPasswordValid) {
			return response.status(401).json({ message: "Wrong Password!" });
		}

		const token = encrypt.generateToken({
			userName: user!.userName,
			email: user!.email,
			role: user!.role,
		});

		return response.json({
			message: "Login successful",
			user: {
				userName: user!.userName,
				email: user!.email,
				role: user!.role,
			},
			token: token,
		});
	} catch (error) {
		return response.status(500).json({ error: "Internal Server Error" });
	}
}

export async function getProfil(request: Request, response: Response) {
	const { userId } = response.locals.jwtPayload;

	try {
		const user = findUser(userId);
		return response.send(user);
	} catch (error) {
		return response.status(404).send("User not found!");
	}
}
