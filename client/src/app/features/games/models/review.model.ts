import { User } from '../../../core/models/user.model';
import { Game } from './game.model';

export interface Review {
	reviewId: string;
	rating: number;
	comment: string | null;
	userId: string;
	user?: User;
	gameId: string;
	game?: Game;
	createdAt: string;
	updatedAt: string;
}
