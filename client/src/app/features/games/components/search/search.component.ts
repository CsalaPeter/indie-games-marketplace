import { Component, inject } from "@angular/core";
import { GameSearchService } from "../../services/search.service";
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrl: './search.component.css',
	imports: [FormsModule]
})

export class SearchComponent {
	readonly searchService = inject(GameSearchService)
}
