import { Component, OnInit, computed, signal } from '@angular/core';
import { GameService } from '../../services/games.service';
import { Game } from "../../models/game.model";

@Component({
	selector: 'app-home-page',
	standalone: true,
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],

})
export class GamesPageComponent implements OnInit {
	games = signal<Game[]>([]);

	constructor(private gameService: GameService) { }

	ngOnInit() {
		// now you can safely use this.gameService
		this.games = this.gameService.games;
		this.gameService.fetchGames();
	}
}
