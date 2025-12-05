import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	private authService = inject(AuthService);
	private router = inject(Router);

	canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.authService.getToken()) {
			return true;
		} else {
			this.router.navigate(['/login'], {
				queryParams: { returnUrl: state.url },
			});
			return false;
		}
	}
}
