import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
	selector: 'app-login',
	imports: [CommonModule, ReactiveFormsModule, RouterLink],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
	private fb = inject(FormBuilder);
	private authService = inject(AuthService);
	private router = inject(Router);
	private route = inject(ActivatedRoute);

	returnUrl = '';
	isLoading = signal<boolean>(false);
	errorMessage = signal<string | null>(null);

	loginForm = this.fb.group({
		email: ['', [Validators.email, Validators.required]],
		password: ['', [Validators.required]],
	});

	ngOnInit(): void {
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

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
				next: () => {
					console.log('Login successful');
					this.isLoading.set(false);
					this.router.navigateByUrl(this.returnUrl);
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
