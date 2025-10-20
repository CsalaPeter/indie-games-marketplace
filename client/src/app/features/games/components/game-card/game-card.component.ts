import { Component, input } from '@angular/core';
import { Game } from '../../models/game.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-game-card',
	templateUrl: './game-card.component.html',
	styleUrls: ['./game-card.component.css'],
	imports: [CommonModule, RouterLink],
})
export class GameCardComponent {
	game = input.required<Game>();
}
