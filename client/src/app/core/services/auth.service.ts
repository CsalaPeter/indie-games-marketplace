import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RegisterRequest, AuthResponse, LoginRequest } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private http = inject(HttpClient);
	private readonly TOKEN_KEY = 'auth_token';

	isAuthenticated = signal<boolean>(this.hasToken());

	register(userData: RegisterRequest): Observable<AuthResponse> {
		return this.http.post<AuthResponse>('/api/register', userData);
	}

	login(credentials: LoginRequest): Observable<AuthResponse> {
		return this.http.post<AuthResponse>('/api/login', credentials).pipe(
			tap((response) => {
				if (response.token) {
					this.setToken(response.token);
				}
			}),
		);
	}

	private setToken(token: string) {
		localStorage.setItem(this.TOKEN_KEY, token);
		this.isAuthenticated.set(true);
	}

	private hasToken() {
		return !!localStorage.getItem(this.TOKEN_KEY);
	}

	getToken() {
		return localStorage.getItem(this.TOKEN_KEY);
	}

	logout() {
		localStorage.removeItem(this.TOKEN_KEY);
		this.isAuthenticated.set(false);
	}
}
