import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
	_route: ActivatedRouteSnapshot,
	_state: RouterStateSnapshot,
) => {
	const authService = inject(AuthService);
	return authService.checkAuthStatus();
};
