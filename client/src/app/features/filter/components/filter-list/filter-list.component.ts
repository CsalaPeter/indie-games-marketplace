import {
	Component,
	InputSignal,
	ModelSignal,
	WritableSignal,
	effect,
	model,
	input,
	signal,
	computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterOptionComponent } from '../filter-option/filter-option.component';
import { Options } from '../../models/option.model';

@Component({
	selector: 'app-filter-list',
	standalone: true,
	template: `
		<div class="filter-list">
			<div class="filter-list__header">
				<svg xmlns="http://www.w3.org/2000/svg">
					<use xlink:href="assets/main.svg#arrow-left" />
				</svg>
				<h4 class="filter-list__header__title" (click)="toggleMenu()">
					{{ title() }}
				</h4>
				@if (selectedOptions().length !== 0) {
					<span class="filter-list__header__title-count" (click)="clearFilter()">
						{{ selectedOptions().length }}
						<svg xmlns="http://www.w3.org/2000/svg">
							<use xlink:href="assets/main.svg#cross" />
						</svg>
					</span>
				}
			</div>
			<div class="filter-list__options" [class.filter-list__options--show]="isActive()">
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
				@if (showAllButton()) {
					<button class="filter-list__button">
						Show all {{ title().toLowerCase() }} >>
					</button>
				}
			</div>
		</div>
	`,
	styleUrl: 'filter-list.component.css',
	imports: [FilterOptionComponent, CommonModule],
})
export class FilterListComponent {
	hasSearch: InputSignal<boolean> = input<boolean>(false);
	openAtStart: InputSignal<boolean> = input<boolean>(false);
	options: InputSignal<Options[]> = input.required<Options[]>();
	showAllButton: InputSignal<boolean> = input<boolean>(false);
	showLimit: InputSignal<number | undefined> = input<number>();
	title: InputSignal<string> = input.required<string>();

	isActive: WritableSignal<boolean> = signal(this.openAtStart());
	searchTerm: WritableSignal<string> = signal('');

	selectedOptions: ModelSignal<string[]> = model.required<string[]>();

	searchedOptions = computed(() => {
		const term: string = this.searchTerm().toLowerCase();
		const options: Options[] = this.options();
		if (!term) return options;
		return options.filter((options) => options.name.toLowerCase().includes(term));
	});

	constructor() {
		effect(() => {
			this.isActive.set(this.openAtStart());
		});
	}

	toggleMenu() {
		this.isActive.update((value) => !value);
	}

	onSearch(event: Event) {
		const value: string = (event.target as HTMLInputElement).value;
		this.searchTerm.set(value);
	}

	clearFilter() {
		this.selectedOptions.set([]);
	}
}
