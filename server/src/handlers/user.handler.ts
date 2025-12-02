import { Request, Response } from "express";
import { encrypt } from "../util/util.js";
import { createUser, findByEmail } from "src/services/user.service.js";
import { User } from "src/database/entities/user.entity.js";

export async function registerUser(
	request: Request<{}, {}, User>,
	response: Response,
) {
	const { userName, email, password } = request.body;

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

		await createUser(user);

		return response
			.status(201)
			.json({ message: "User registered successfully" });
	} catch (error) {
		return response.status(500).json({ error: "Internal Server Error" });
	}
}
