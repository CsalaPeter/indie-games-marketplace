import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterLink],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css',
})
export class RegisterComponent {
	private fb = inject(FormBuilder);
	private authService = inject(AuthService);
	private router = inject(Router);

	isLoading = signal<boolean>(false);
	errorMessage = signal<string | null>(null);

	registerForm = this.fb.group({
		username: ['', [Validators.required, Validators.minLength(4)]],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(8)]],
		role: ['user'],
	});

	onSubmit() {
		this.errorMessage.set(null);

		if (this.registerForm.invalid) {
			this.registerForm.markAllAsTouched();
			return;
		}

		this.isLoading.set(true);

		const formData = this.registerForm.getRawValue();

		this.authService
			.register({
				userName: formData.username!,
				email: formData.email!,
				password: formData.password!,
				role: formData.role!,
			})
			.subscribe({
				next: () => {
					this.isLoading.set(false);
					this.router.navigate(['/auth/login']);
				},
				error: (error) => {
					this.isLoading.set(false);
					if (error.status === 409) {
						this.errorMessage.set('This email is already taken.');
					} else {
						this.errorMessage.set(error.error?.message || 'Registration failed');
					}
				},
			});
	}
}
