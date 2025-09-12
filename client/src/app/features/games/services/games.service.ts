import { inject, Injectable, resource } from "@angular/core";
import { httpResource } from "@angular/common/http";
import { Game } from "../models/game.model";

@Injectable({ providedIn: 'root' })
export class GameService {
	getGamesResource() {
		return httpResource<Game[]>(() => '/api/games', { defaultValue: [] });
	}
}
