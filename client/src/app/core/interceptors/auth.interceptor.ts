import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
	const authService = inject(AuthService);
	const router = inject(Router);
	const token = authService.getToken();
	let authRequest = request;

	if (token) {
		authRequest = request.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	return next(authRequest).pipe(
		catchError((error) => {
			if (error.status === 401) {
				authService.logout();
				router.navigate(['/login']);
			}

			return throwError(() => error);
		}),
	);
};
