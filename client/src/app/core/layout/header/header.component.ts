import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { SearchComponent } from "../../../features/games/components/search/search.component";

@Component({
	selector: 'app-layout-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.css',
	imports: [RouterLink, SearchComponent],
})

export class HeaderComponent {

}
