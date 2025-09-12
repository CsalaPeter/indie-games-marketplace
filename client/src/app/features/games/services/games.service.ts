import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Game } from "../models/game.model";

@Injectable({ providedIn: 'root' })
export class GameService {
	readonly games = signal<Game[]>([]);

	constructor(private http: HttpClient) { }

	fetchGames() {
		this.http.get<Game[]>('api/games').subscribe({
			next: (games) => this.games.set(games),
			error: (err) => console.error(err)
		});
	}
}
