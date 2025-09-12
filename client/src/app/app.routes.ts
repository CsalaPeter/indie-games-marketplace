import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: "",
		loadComponent: () => import("./features/games/pages/home/home.component").then(m => m.GamesPageComponent),
	}
];
