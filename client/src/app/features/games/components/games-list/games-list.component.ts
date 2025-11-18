import { Component, input } from '@angular/core';
import { GameCardComponent } from '../game-card/game-card.component';
import { GameCardSkeleton } from '../game-card-skeleton/game-card-skeleton.component';
import { Game } from '../../models/game.model';

@Component({
	selector: 'app-games-list',
	standalone: true,
	templateUrl: './games-list.component.html',
	styleUrls: ['./games-list.component.css'],
	imports: [GameCardComponent, GameCardSkeleton],
})
export class GamesListComponent {
	games = input.required<Game[]>();
	isLoading = input(false);
}
