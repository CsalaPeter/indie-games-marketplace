import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { CreateUserDto } from "../dto/user.dto.js";
dotenv.config();

const { JWT_SECRET = "", JWT_EXPIRATION = "" } = process.env;
export class encrypt {
	static encryptPassword(password: string) {
		return bcrypt.hashSync(password, 10);
	}

	static comparePassword(hashPassword: string, password: string) {
		return bcrypt.compareSync(password, hashPassword);
	}

	static generateToken(payload: CreateUserDto) {
		return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
	}
}
