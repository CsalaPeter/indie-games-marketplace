import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest, AuthResponse } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private http = inject(HttpClient);

	register(userData: RegisterRequest): Observable<AuthResponse> {
		return this.http.post<AuthResponse>('/api/register', userData);
	}
}
