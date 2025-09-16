import { Component } from '@angular/core';
import { GamesListComponent } from '../../components/games-list/games-list.component';

@Component({
	selector: 'app-home-page',
	standalone: true,
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
	imports: [GamesListComponent]

})
export class GamesPageComponent {

}
