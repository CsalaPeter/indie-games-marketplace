import { Component, computed, effect, inject, model, signal, WritableSignal } from '@angular/core';
import { HttpResourceRef } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FilterListComponent } from '../../../filter/components/filter-list/filter-list.component';
import { GamesSkeletonComponent } from '../../components/games-skeleton/games-skeleton.component';
import { GamesListComponent } from '../../components/games-list/games-list.component';
import { FilterService } from '../../services/filter.service';
import { GameService } from '../../services/games.service';
import { Platform } from '../../models/platform.model';
import { Genre } from '../../models/genre.model';
import { Game } from '../../models/game.model';
import { Tag } from '../../models/tag.model';

@Component({
	selector: 'app-browse-page',
	standalone: true,
	templateUrl: './browse.component.html',
	styleUrls: ['browse.component.css'],
	imports: [GamesListComponent, FilterListComponent, GamesSkeletonComponent, FormsModule],
})
export class BrowsePageComponent {
	private gameService = inject(GameService);
	private filterService = inject(FilterService);
	selectedGenres = model<string[]>([]);
	selectedTags = model<string[]>([]);
	selectedPlatforms = model<string[]>([]);

	searchTerm: WritableSignal<string> = signal('');
	debouncedSearchTerm: WritableSignal<string> = signal('');
	private debounceTimer: number | undefined;

	constructor() {
		effect(() => {
			const term = this.searchTerm();

			if (this.debounceTimer) {
				clearTimeout(this.debounceTimer);
			}

			this.debounceTimer = setTimeout(() => {
				this.debouncedSearchTerm.set(term);
			}, 600);
		});
	}

	updateSearchTerm(term: string): void {
		this.searchTerm.set(term);
	}

	getRawSearchTerm(): string {
		return this.searchTerm();
	}

	filters = computed(() => ({
		genres: this.selectedGenres(),
		tags: this.selectedTags(),
		platforms: this.selectedPlatforms(),
		term: this.debouncedSearchTerm(),
	}));

	genres: HttpResourceRef<Genre[]> = this.filterService.getGenres();
	tags: HttpResourceRef<Tag[]> = this.filterService.getTags();
	platforms: HttpResourceRef<Platform[]> = this.filterService.getPlatforms();
	games: HttpResourceRef<Game[]> = this.gameService.getGamesResource(this.filters);
}
