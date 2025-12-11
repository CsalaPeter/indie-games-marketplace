import { AppDataSource } from "../database/dataSource.js";
import { User } from "../database/entities/user.entity.js";

export async function createUser(user: User) {
	return AppDataSource.getRepository(User).save(user);
}

export async function findByEmail(email: string) {
	return AppDataSource.getRepository(User).findOne({ where: { email } });
}

export async function findUser(userId: string) {
	return AppDataSource.getRepository(User).findOneOrFail({
		where: { userId },
		select: ["username", "email", "role"],
	});
}
