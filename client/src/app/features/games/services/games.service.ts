import { Injectable, inject, Signal } from '@angular/core';
import { httpResource, HttpClient } from '@angular/common/http';
import { Game } from '../models/game.model';

@Injectable({ providedIn: 'root' })
export class GameService {
	private http = inject(HttpClient);

	getGamesResource(
		params: Signal<{
			genres: string[];
			tags: string[];
			platforms: string[];
			term: string;
			sort: string;
			page: number;
			limit: number;
		}>,
	) {
		return httpResource<{ data: Game[]; total: number; page: number; pages: number }>(
			() => ({
				url: '/api/games',
				method: 'GET',
				params: params(),
			}),
			{ defaultValue: { data: [], total: 0, page: 1, pages: 1 } },
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

	uploadGame(formData: FormData) {
		return this.http.post('/api/upload', formData);
	}
}
