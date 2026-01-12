import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GameService } from '../../services/games.service';

@Component({
	selector: 'app-game-upload',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './game-upload.component.html',
	styleUrl: './game-upload.component.css',
})
export class GameUploadComponent {
	private fb = inject(FormBuilder);
	private gameService = inject(GameService);

	uploadForm = this.fb.group({
		name: ['', Validators.required],
		description: ['', [Validators.required, Validators.minLength(50)]],
		cardImageUrl: [null as File | null, Validators.required],
		filePath: [null as File | null, Validators.required],
	});
}
