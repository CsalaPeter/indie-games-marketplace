import { Injectable } from "@angular/core";
import { httpResource } from "@angular/common/http";
import { Game } from "../models/game.model";

@Injectable({ providedIn: 'root' })
export class GameService {
	getGamesResource() {
		return httpResource<Game[]>(() => '/api/', { defaultValue: [] });
	}

	getGameResource(slug: string) {
		return httpResource<Game>(() => ({
			url: `/api/game/${encodeURIComponent(slug)}`,
			method: 'GET'
		}), { defaultValue: {} as Game });
	}
}
