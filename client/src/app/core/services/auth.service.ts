import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { RegisterRequest, AuthResponse, LoginRequest } from '../models/auth.model';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private http = inject(HttpClient);
	private router = inject(Router);

	isAuthenticated = signal<boolean>(false);
	currentUser = signal<User | null>(null);

	register(userData: RegisterRequest): Observable<AuthResponse> {
		return this.http.post<AuthResponse>('/api/register', userData);
	}

	login(credentials: LoginRequest): Observable<AuthResponse> {
		return this.http.post<AuthResponse>('/api/login', credentials).pipe(
			tap({
				next: () => this.isAuthenticated.set(true),
			}),
		);
	}

	logout(): Observable<any> {
		return this.http.post('/api/logout', null).pipe(
			tap({
				next: () => this.isAuthenticated.set(false),
			}),
		);
	}

	checkAuthStatus(): Observable<boolean> {
		return this.http.get<User>('/api/profile').pipe(
			tap({
				next: (user) => {
					this.isAuthenticated.set(true);
					this.currentUser.set(user);
				},
			}),
			map(() => true),
			catchError(() => {
				this.isAuthenticated.set(false);
				this.currentUser.set(null);
				return of(false);
			}),
		);
	}
}
