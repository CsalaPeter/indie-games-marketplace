import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GameService } from '../../services/games.service';
import { Game } from '../../models/game.model';
import { HttpResourceRef } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';

register();

@Component({
	standalone: true,
	selector: 'app-game-page',
	templateUrl: './game-details.component.html',
	styleUrl: './game-details.component.css',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GamePage {
	route = inject(ActivatedRoute);
	slug = this.route.snapshot.paramMap.get('slug')!;
	game: HttpResourceRef<Game>;

	constructor(private gameService: GameService) {
		this.game = this.gameService.getGameResource(this.slug);
	}

	onProgress(event: CustomEvent<[Swiper, number]>) {
		const [swiper, progress] = event.detail;
		console.log(progress);
	}

	onSlideChange() {
		console.log('slide changed');
	}
}
