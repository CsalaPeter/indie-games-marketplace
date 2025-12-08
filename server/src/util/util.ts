import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { CreateUserDto } from "../dto/user.dto.js";
dotenv.config();

const { JWT_SECRET = "" } = process.env;
export class encrypt {
	static encryptPassword(password: string) {
		return bcrypt.hashSync(password, 10);
	}

	static comparePassword(password: string, hashPassword: string) {
		return bcrypt.compareSync(password, hashPassword);
	}

	static generateToken(user: CreateUserDto) {
		console.log(user);
		return jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
	}
}
