import { Request, Response } from "express";
import { encrypt } from "../util/util.js";
import { createUser, findByEmail, findUser } from "../services/user.service.js";
import { User } from "../database/entities/user.entity.js";
import { LoginDto } from "../dto/user.dto.js";
import { RegisterInput } from "src/schemas/auth.schema.js";

export async function registerUser(
	request: Request<{}, {}, RegisterInput>,
	response: Response,
) {
	const { username, email, password, role } = request.body;

	try {
		const existingUser = await findByEmail(email);
		if (existingUser) {
			return response
				.status(409)
				.json({ message: "Email already in use" });
		}

		const hasedPassword = encrypt.encryptPassword(password);

		const user = new User();
		user.username = username;
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
			user.password,
		);

		if (!isPasswordValid) {
			return response.status(401).json({ message: "Wrong Password!" });
		}

		const token = encrypt.generateToken({
			userId: user.userId,
			username: user.username,
			email: user.email,
			role: user.role,
		});

		response.cookie("token", token, {
			httpOnly: true,
			sameSite: "strict",
		});

		return response.json({
			userId: user.userId,
			username: user.username,
			email: user.email,
			role: user.role,
		});
	} catch (error) {
		console.log(error);
		return response.status(500).json({ error: "Internal Server Error" });
	}
}

export async function logoutUser(_request: Request, response: Response) {
	response.clearCookie("token", {
		httpOnly: true,
		sameSite: "strict",
	});
	return response.json({ message: "Logged out successfully!" });
}

export async function getProfile(request: Request, response: Response) {
	const { userId } = request.cookies.token;

	try {
		const user = findUser(userId);
		return response.send(user);
	} catch (error) {
		return response.status(404).send("User not found!");
	}
}
