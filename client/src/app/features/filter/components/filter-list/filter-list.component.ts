import { Component, model, input } from '@angular/core';
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
				@for (option of options(); track option.id) {
					<filter-option
						[label]="option.name"
						[value]="option.name"
						[(filters)]="selectedOptions"
					></filter-option>
				}
			</div>
		</div>
	`,
	styleUrl: 'filter-list.component.css',
	imports: [FilterOptionComponent],
})
export class FilterListComponent {
	title = input.required<string>();
	options = input.required<Options[]>();
	selectedOptions = model.required<string[]>();
	isActive = false;

	clearFilter() {
		this.selectedOptions.set([]);
	}
}
