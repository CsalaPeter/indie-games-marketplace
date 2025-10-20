import { Component, computed, effect, inject, model } from '@angular/core';
import { GamesListComponent } from '../../components/games-list/games-list.component';
import { GameService } from '../../services/games.service';
import { FilterListComponent } from '../../../filter/components/filter-list/filter-list.component';
import { FilterService } from '../../services/filter.service';
import { HttpResourceRef } from '@angular/common/http';
import { Genre } from '../../models/genre.model';
import { Tag } from '../../models/tag.model';
import { Game } from '../../models/game.model';

@Component({
	selector: 'app-browse-page',
	standalone: true,
	templateUrl: './browse.component.html',
	styleUrls: ['browse.component.css'],
	imports: [GamesListComponent, FilterListComponent],
})
export class BrowsePageComponent {
	private gameService = inject(GameService);
	private filterService = inject(FilterService);
	selectedGenres = model<string[]>([]);
	selectedTags = model<string[]>([]);

	filters = computed(() => ({
		genres: this.selectedGenres(),
		tags: this.selectedTags(),
	}));

	genres: HttpResourceRef<Genre[]> = this.filterService.getGenres();
	tags: HttpResourceRef<Tag[]> = this.filterService.getTags();
	games: HttpResourceRef<Game[]> = this.gameService.getGamesResource(this.filters);
}
