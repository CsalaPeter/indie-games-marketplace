import { AppDataSource } from "../database/dataSource.js";
import { Platform } from "../database/entities/platform.entity.js";

export async function getPlatforms(): Promise<Platform[]> {
	return AppDataSource.getRepository(Platform)
		.createQueryBuilder("platform")
		.getMany();
}
