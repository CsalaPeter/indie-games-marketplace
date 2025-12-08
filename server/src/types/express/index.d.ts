import { CreateUserDto } from "../dto/user.dto.ts";

declare global {
	namespace Express {
		interface Request {
			user: CreateUserDto;
		}
	}
}
