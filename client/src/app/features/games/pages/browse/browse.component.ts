import { Component, computed, effect, model } from "@angular/core";
import { GamesListComponent } from '../../components/games-list/games-list.component';
import { GameService } from '../../services/games.service';
import { FilterListComponent } from "../../../filter/components/filter-list/filter-list.component";
import { HttpResourceRef } from "@angular/common/http";
import { Genre } from "../../models/genre.model";
import { Tag } from "../../models/tag.model";
import { FilterService } from "../../services/filter.service";
import { Game } from "../../models/game.model";

@Component({
	selector: 'app-browse-page',
	standalone: true,
	templateUrl: './browse.component.html',
	styleUrl: 'browse.component.css',
	imports: [GamesListComponent, FilterListComponent]
})

export class BrowsePageComponent {
	games: HttpResourceRef<Game[]>;
	genres: HttpResourceRef<Genre[]>;
	tags: HttpResourceRef<Tag[]>;
	selectedGenres = model<string[]>([]);
	selectedTags = model<string[]>([]);

	filters = computed(() => ({
		genres: this.selectedGenres(),
		tags: this.selectedTags()
	}));

	constructor(
		private filterService: FilterService,
		private gameService: GameService
	) {
		this.genres = this.filterService.getGenres();
		this.tags = this.filterService.getTags();
		this.games = this.gameService.getGamesResource(this.filters);
	}
}
