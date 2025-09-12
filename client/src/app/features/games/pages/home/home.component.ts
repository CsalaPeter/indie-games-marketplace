import { Component, computed, signal } from '@angular/core';
import { GameService } from '../../services/games.service';
import { Game } from "../../models/game.model";
import { HttpResourceRef } from '@angular/common/http';

@Component({
	selector: 'app-home-page',
	standalone: true,
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],

})
export class GamesPageComponent {
	games: HttpResourceRef<Game[]>;

	constructor(private gameService: GameService) {
		this.games = this.gameService.getGamesResource();
	}


}
