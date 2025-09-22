import { Component, inject } from '@angular/core';
import { GameService } from '../../services/games.service';
import { Game } from "../../models/game.model";
import { HttpResourceRef } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
	standalone: true,
	selector: 'app-game-page',
	templateUrl: './game-details.component.html',
	styleUrl: './game-details.component.css'
})
export class GamePage {
	route = inject(ActivatedRoute);
	slug = this.route.snapshot.paramMap.get('slug')!;
	games: HttpResourceRef<Game>;

	constructor(private gameService: GameService) {
		this.games = this.gameService.getGameResource(this.slug);
	}
}
