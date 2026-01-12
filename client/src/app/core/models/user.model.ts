import { Review } from '../../features/games/models/review.model';

export interface User {
	userId: string;
	username: string;
	email: string;
	role: string;
	avatarUrl: string;
	reviews?: Review[];
}
