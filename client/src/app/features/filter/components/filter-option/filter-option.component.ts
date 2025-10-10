import { Component, input, model, computed, ChangeDetectionStrategy } from "@angular/core";

@Component({
	selector: 'filter-option',
	standalone: true,
	template: `
		<label>
			<input
				type="checkbox"
				[checked]="isChecked()"
				(change)="toggle()" />
			<span>{{ label() }}</span>
		</label>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FilterOptionComponent {
	label = input.required<string>();
	value = input.required<string>();
	filters = model.required<string[]>();
	isChecked = computed(() => this.filters().includes(this.value()));

	toggle() {
		const filter = this.value();

		this.filters.update(currentFilters =>
			currentFilters.includes(filter)
				? currentFilters.filter(val => val !== filter)
				: [...currentFilters, filter]
		);
	}
}
