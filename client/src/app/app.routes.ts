import { Routes } from '@angular/router';
import { NotFound } from './core/errors/not-found/not-found.component';
import { GamesPageComponent } from './features/games/pages/home/home.component';
import { BrowsePageComponent } from './features/games/pages/browse/browse.component';
import { GamePage } from './features/games/pages/game-page/game-page.component';

export const routes: Routes = [
	{
		path: '',
		component: GamesPageComponent,
		title: 'Home',
	},
	{
		path: 'register',
		loadComponent: () =>
			import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
	},
	{
		path: 'login',
		loadComponent: () =>
			import('./features/auth/login/login.component').then((m) => m.LoginComponent),
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
