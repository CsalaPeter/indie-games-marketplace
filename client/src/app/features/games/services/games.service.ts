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

	uploadGame(data: any, coverImage: File, gameFile: File) {
		const formData = new FormData();

		formData.append('name', data.name);
		formData.append('slug', data.slug);
		formData.append('description', data.description);
		formData.append('price', data.price.toString());
		formData.append('releaseDate', data.releaseDate);
		formData.append('tags', JSON.stringify(data.tags));
		formData.append('platforms', JSON.stringify(data.platforms));
		formData.append('genres', JSON.stringify(data.genres));
		formData.append('coverImage', coverImage);
		formData.append('gameFile', gameFile);

		return this.http.post('/api/upload', formData);
	}
}
