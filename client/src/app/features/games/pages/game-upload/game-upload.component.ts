import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GameService } from '../../services/games.service';
import { CommonModule } from '@angular/common';
import { HttpResourceRef } from '@angular/common/http';
import { Platform } from '../../models/platform.model';
import { Genre } from '../../models/genre.model';
import { Tag } from '../../models/tag.model';
import { FilterService } from '../../services/filter.service';

@Component({
	selector: 'app-game-upload',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './game-upload.component.html',
	styleUrl: './game-upload.component.css',
})
export class GameUploadComponent {
	private fb = inject(FormBuilder);
	private gameService = inject(GameService);
	private filterService: FilterService = inject(FilterService);

	coverImage = signal<File | null>(null);
	gameFile = signal<File | null>(null);
	isSubmitting = signal(false);

	availableGenres: HttpResourceRef<Genre[]> = this.filterService.getGenres();
	availableTags: HttpResourceRef<Tag[]> = this.filterService.getTags();
	availablePlatforms: HttpResourceRef<Platform[]> = this.filterService.getPlatforms();

	uploadForm = this.fb.group({
		name: ['', [Validators.required, Validators.minLength(3)]],
		slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)]],
		description: ['', [Validators.required, Validators.minLength(50)]],
		price: [0, [Validators.required, Validators.min(0)]],
		releaseDate: ['', [Validators.required]],
		genres: [[] as string[], Validators.required],
		platforms: [[] as string[], Validators.required],
		tags: [[] as string[]],
	});

	onCoverImageSelected(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files?.length) {
			this.coverImage.set(input.files[0]);
		}
	}

	onGameFileSelected(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files?.length) {
			this.gameFile.set(input.files[0]);
		}
	}

	onSubmit() {
		if (this.uploadForm.invalid || !this.coverImage() || !this.gameFile()) {
			this.uploadForm.markAllAsTouched();
			return;
		}

		this.isSubmitting.set(true);

		this.gameService
			.uploadGame(this.uploadForm.value, this.coverImage()!, this.gameFile()!)
			.subscribe({
				next: (response) => {
					console.log('Upload success', response);
					this.isSubmitting.set(false);
				},
				error: (error) => {
					console.error('Upload failed', error);
					this.isSubmitting.set(false);
				},
			});
	}
}
