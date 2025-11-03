import { Routes } from '@angular/router';
import { NotFound } from './core/errors/not-found/not-found.component';
import { GamesPageComponent } from './features/games/pages/home/home.component';
import { BrowsePageComponent } from './features/games/pages/browse/browse.component';
import { GamePage } from './features/games/pages/game-details/game-details.component';

export const routes: Routes = [
	{
		path: '',
		component: GamesPageComponent,
		title: 'Home',
	},
	{
		path: 'browse',
		component: BrowsePageComponent,
		title: 'Browse Games',
	},
	{
		path: 'game/:slug',
		component: GamePage,
	},
	{ path: '**', component: NotFound },
];
