import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Game } from '../models/game.model';

@Injectable({ providedIn: 'root' })
export class GameService {
	getGamesResource(
		params: Signal<{
			genres: string[];
			tags: string[];
			platforms: string[];
			term: string;
			sort: string;
		}>,
	) {
		return httpResource<Game[]>(
			() => ({
				url: '/api/games',
				method: 'GET',
				params: params(),
			}),
			{ defaultValue: [] },
		);
	}

	getGameResource(slug: string) {
		return httpResource<Game>(
			() => ({
				url: `/api/game/${encodeURIComponent(slug)}`,
				method: 'GET',
			}),
			{ defaultValue: {} as Game },
		);
	}
}
