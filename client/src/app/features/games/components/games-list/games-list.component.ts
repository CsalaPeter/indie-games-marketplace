import { Component, input } from '@angular/core';
import { GameCardComponent } from '../game-card/game-card.component';
import { Game } from '../../models/game.model';

@Component({
	selector: 'app-games-list',
	standalone: true,
	templateUrl: './games-list.component.html',
	styleUrls: ['./games-list.component.css'],
	imports: [GameCardComponent]
})

export class GamesListComponent {
	games = input.required<Game[]>();
}
