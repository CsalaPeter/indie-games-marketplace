import {
	Component,
	computed,
	effect,
	inject,
	model,
	ModelSignal,
	signal,
	WritableSignal,
} from '@angular/core';
import { HttpResourceRef } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FilterListComponent } from '../../../filter/components/filter-list/filter-list.component';
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
	imports: [GamesListComponent, FilterListComponent, FormsModule],
})
export class BrowsePageComponent {
	sortOptions = [
		{ id: 'date-new', label: 'Release Date (from newest)' },
		{ id: 'date-old', label: 'Release Date (from oldest)' },
		{ id: 'price-ascending', label: 'Price (from lowest)' },
		{ id: 'price-descending', label: 'Price (from highest)' },
		{ id: 'name-az', label: 'Name (A–Z)' },
		{ id: 'name-za', label: 'Name (Z–A)' },
		{ id: 'rating', label: 'Rating (from highest)' },
	];

	gameService: GameService = inject(GameService);
	filterService: FilterService = inject(FilterService);

	selectedGenres: ModelSignal<string[]> = model<string[]>([]);
	selectedTags: ModelSignal<string[]> = model<string[]>([]);
	selectedPlatforms: ModelSignal<string[]> = model<string[]>([]);

	searchTerm: WritableSignal<string> = signal('');
	debouncedSearchTerm: WritableSignal<string> = signal('');
	currentPage: WritableSignal<number> = signal(1);

	selectedOptionId = signal('date-new');
	selectedOptionLabel = signal(
		this.sortOptions.find((option) => option.id === this.selectedOptionId())?.label || '',
	);

	debounceTimer: number | undefined;
	isActive: boolean = false;
	pageSize: number = 9;

	constructor() {
		effect(() => {
			const term = this.searchTerm();

			if (this.debounceTimer) {
				clearTimeout(this.debounceTimer);
			}

			this.debounceTimer = setTimeout(() => {
				this.debouncedSearchTerm.set(term);
			}, 600);

			this.selectedOptionId();
			this.selectedGenres();
			this.selectedTags();
			this.selectedPlatforms();
			this.debouncedSearchTerm();
			this.currentPage.set(1);
		});
	}

	onOptionClick(event: Event) {
		const target = event.target as HTMLElement;

		if (target.tagName === 'INPUT') {
			const input = target as HTMLInputElement;
			const selected = this.sortOptions.find((option) => option.id === input.id);

			if (selected) {
				this.selectedOptionId.set(selected.id);
				this.selectedOptionLabel.set(selected.label);
			}

			(document.getElementById('sortbox__list') as any)?.hidePopover?.();
		}
	}

	pageNumbers = computed(() => {
		const info = this.games.value();
		const totalPages = info.pages;
		const current = info.page;
		const maxButtons = 9;
		if (totalPages <= maxButtons) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}
		let start = Math.max(current - Math.floor(maxButtons / 2), 1);
		let end = start + maxButtons - 1;
		if (end > totalPages) {
			end = totalPages;
			start = end - maxButtons + 1;
		}
		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	});

	prevPage() {
		if (this.currentPage() > 1) {
			this.currentPage.set(this.currentPage() - 1);
		}
	}

	nextPage() {
		const info = this.games.value();
		if (this.currentPage() < info.pages) {
			this.currentPage.set(this.currentPage() + 1);
		}
	}

	goToPage(page: number) {
		if (page !== this.currentPage()) {
			this.currentPage.set(page);
		}
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
		sort: this.selectedOptionId(),
		page: this.currentPage(),
		limit: this.pageSize,
	}));

	genres: HttpResourceRef<Genre[]> = this.filterService.getGenres();
	tags: HttpResourceRef<Tag[]> = this.filterService.getTags();
	platforms: HttpResourceRef<Platform[]> = this.filterService.getPlatforms();
	games: HttpResourceRef<{ data: Game[]; total: number; page: number; pages: number }> =
		this.gameService.getGamesResource(this.filters);
}
