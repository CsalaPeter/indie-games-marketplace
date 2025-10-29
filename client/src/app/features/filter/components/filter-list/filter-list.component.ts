import { Component, model, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterOptionComponent } from '../filter-option/filter-option.component';
import { Options } from '../../models/option.model';

@Component({
	selector: 'app-filter-list',
	standalone: true,
	template: `
		<div class="filter-list">
			<div class="filter-list__header">
				<h4 class="filter-list__header__title" (click)="isActive = !isActive">
					{{ title() }}
				</h4>
				@if (selectedOptions().length !== 0) {
					<span class="filter-list__header__title-count" (click)="clearFilter()">
						{{ selectedOptions().length }}
						<span>X</span>
					</span>
				}
			</div>
			<div class="filter-list__options" [class.filter-list__options--show]="isActive">
				@if (hasSearch()) {
					<input
						name="filter-seach"
						type="text"
						class="filter-list__search"
						placeholder="Search for more {{ title().toLowerCase() }}..."
						(input)="onSearch($event)"
					/>
				}
				@for (option of searchedOptions() | slice: 0 : showLimit(); track option.id) {
					<filter-option
						[label]="option.name"
						[value]="option.name"
						[(filters)]="selectedOptions"
					></filter-option>
				}
				<button class="filter-list__button">Show all {{ title().toLowerCase() }} >></button>
			</div>
		</div>
	`,
	styleUrl: 'filter-list.component.css',
	imports: [FilterOptionComponent, CommonModule],
})
export class FilterListComponent {
	title = input.required<string>();
	options = input.required<Options[]>();
	selectedOptions = model.required<string[]>();
	showLimit = input<number>();
	hasSearch = input<boolean>(false);
	isActive = false;
	searchTerm = signal('');

	searchedOptions = computed(() => {
		const term = this.searchTerm().toLowerCase();
		const options = this.options();
		if (!term) return options;
		return options.filter((options) => options.name.toLowerCase().includes(term));
	});

	onSearch(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		this.searchTerm.set(value);
	}

	clearFilter() {
		this.selectedOptions.set([]);
	}
}
