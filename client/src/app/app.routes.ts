import { Routes } from '@angular/router';
import { NotFound } from './core/errors/not-found/not-found.component';
import { GamesPageComponent } from './features/games/pages/home/home.component';
import { BrowsePageComponent } from './features/games/pages/browse/browse.component';
import { GamePage } from './features/games/pages/game-page/game-page.component';
import { authGuard } from './core/auth/auth.guard';
import { GameUploadComponent } from './features/games/pages/game-upload/game-upload.component';

export const routes: Routes = [
	{
		path: '',
		component: GamesPageComponent,
		title: 'Home',
	},
	{
		path: 'register',
		title: 'Register',
		loadComponent: () =>
			import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
	},
	{
		path: 'login',
		title: 'Login',
		loadComponent: () =>
			import('./features/auth/login/login.component').then((m) => m.LoginComponent),
	},
	{
		path: 'browse',
		component: BrowsePageComponent,
		title: 'Browse Games',
		canActivate: [authGuard],
	},
	{
		path: 'game/:slug',
		component: GamePage,
	},
	{
		path: 'upload-game',
		component: GameUploadComponent,
		title: 'Upload Your Game',
		canActivate: [authGuard],
	},
	{ path: '**', component: NotFound },
];
