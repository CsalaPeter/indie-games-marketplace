import { Component, Input } from '@angular/core';
import { Game } from '../../models/game.model';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-game-card',
	templateUrl: './game-card.component.html',
	styleUrls: ['./game-card.component.css'],
	imports: [CommonModule],
})
export class GameCardComponent {
	@Input() game!: Game
}
