import { Component, inject } from '@angular/core';
import { GameSearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrl: './search.component.css',
	imports: [FormsModule, CommonModule, RouterLink],
})
export class SearchComponent {
	readonly searchService = inject(GameSearchService);

	get results() {
		return this.searchService.searchResults.value();
	}

	get isLoading() {
		return this.searchService.searchResults.isLoading();
	}

	get term() {
		return this.searchService.debouncedSearchTerm();
	}

	hasResults() {
		if (this.searchService.debouncedSearchTerm().length >= 3) {
			return true;
		}
		return false;
	}

	selectItem() {
		this.searchService.updateSearchTerm('');
	}
}
