import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
	selector: 'app-login',
	imports: [CommonModule, ReactiveFormsModule, RouterLink],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent {
	private fb = inject(FormBuilder);
	private authService = inject(AuthService);
	private router = inject(Router);

	isLoading = signal<boolean>(false);
	errorMessage = signal<string | null>(null);

	loginForm = this.fb.group({
		email: ['', [Validators.email, Validators.required]],
		password: ['', [Validators.required]],
	});

	onSubmit() {
		this.errorMessage.set(null);

		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		}

		this.isLoading.set(true);
		const { email, password } = this.loginForm.getRawValue();
		this.authService
			.login({
				email: email!,
				password: password!,
			})
			.subscribe({
				next: (response) => {
					console.log('Login successful', response);
					this.isLoading.set(false);
					this.router.navigate(['/']);
				},
				error: (error) => {
					this.isLoading.set(false);
					if (error.status === 401) {
						this.errorMessage.set('Invalid email or password.');
					} else {
						this.errorMessage.set('Something went wrong. Please try again.');
					}
				},
			});
	}
}
