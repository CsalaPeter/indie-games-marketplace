import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GameService } from '../../services/games.service';
import { Game } from '../../models/game.model';
import { HttpResourceRef } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { register } from 'swiper/element/bundle';

register();

@Component({
	standalone: true,
	selector: 'app-game-page',
	templateUrl: './game-page.component.html',
	styleUrl: './game-page.component.css',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GamePage {
	route = inject(ActivatedRoute);
	slug = this.route.snapshot.paramMap.get('slug')!;
	game: HttpResourceRef<Game>;

	constructor(private gameService: GameService) {
		this.game = this.gameService.getGameResource(this.slug);
	}
}
