import { Component } from '@angular/core';
import { GameService } from '../../services/games.service';
import { Game } from "../../models/game.model";
import { HttpResourceRef } from '@angular/common/http';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
	selector: 'app-games-list',
	standalone: true,
	templateUrl: './games-list.component.html',
	styleUrls: ['./games-list.component.css'],
	imports: [GameCardComponent]
})

export class GamesListComponent {
	games: HttpResourceRef<Game[]>;

	constructor(private gameService: GameService) {
		this.games = this.gameService.getGamesResource();
	}
}
