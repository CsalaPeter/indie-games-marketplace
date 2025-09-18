import { Routes } from '@angular/router';
import { NotFound } from './core/errors/not-found/not-found.component';

export const routes: Routes = [
	{
		path: "",
		loadComponent: () => import("./features/games/pages/home/home.component").then(m => m.GamesPageComponent),
	},
	{ path: '**', component: NotFound }
];
