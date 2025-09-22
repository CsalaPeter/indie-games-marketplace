import { Routes } from '@angular/router';
import { NotFound } from './core/errors/not-found/not-found.component';

export const routes: Routes = [
	{
		path: "",
		loadComponent: () => import("./features/games/pages/home/home.component").then(m => m.GamesPageComponent),
	},
	{
		path: "game/:slug",
		loadComponent: () => import("./features/games/pages/game-details/game-details.component").then(m => m.GamePage),
	},
	{ path: '**', component: NotFound }
];
