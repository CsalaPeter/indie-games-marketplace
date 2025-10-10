import { Component, model, input } from "@angular/core";
import { FilterOptionComponent } from "../filter-option/filter-option.component";
import { Options } from "../../models/option.model";

@Component({
	selector: 'app-filter-list',
	standalone: true,
	template: `
		<details class="filter-list">
			<summary class="filter-list__title">{{title()}}</summary>
			<div class="filter-list__options">
				@for ( option of options(); track option.id) {
					<filter-option [label]="option.name" [value]="option.name" [(filters)]="selectedOptions"></filter-option>
				}
			</div>
		</details>
	`,
	styleUrl: 'filter-list.component.css',
	imports: [FilterOptionComponent]
})

export class FilterListComponent {
	title = input.required<string>();
	options = input.required<Options[]>();
	selectedOptions = model.required<string[]>();
}
