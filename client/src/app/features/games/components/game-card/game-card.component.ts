import { Component, input } from '@angular/core';
import { Game } from '../../models/game.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
	selector: 'app-game-card',
	templateUrl: './game-card.component.html',
	styleUrls: ['./game-card.component.css'],
	imports: [CommonModule, RouterLink],
})
export class GameCardComponent {
	game = input.required<Game>();

	getImageUrl(path: string): string {
		return `${environment.apiUrl}/${path}`;
	}
}
