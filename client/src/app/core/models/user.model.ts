import { Review } from '../../features/games/models/review.model';

export interface User {
	userId: string;
	userName: string;
	email: string;
	role: string;
	avatarUrl: string;
	reviews?: Review[];
}
