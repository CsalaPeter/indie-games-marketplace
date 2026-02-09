import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SearchComponent } from '../../../features/games/components/search/search.component';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-layout-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.css',
	imports: [RouterLink, SearchComponent],
})
export class HeaderComponent {
	authService = inject(AuthService);
	private router = inject(Router);
	isOpen = signal(false);
	elementRef = inject(ElementRef);
	timer: number = 0;

	showMenu() {
		if (this.timer) {
			clearTimeout(this.timer);
		}
		this.isOpen.set(true);
	}

	hideMenu() {
		this.timer = setTimeout(() => {
			this.isOpen.set(false);
		}, 200);
	}

	logout() {
		this.authService.logout().subscribe({
			next: () => {
				this.router.navigate(['/']);
			},
			error: (error) => {
				console.error('Logout failed', error);
			},
		});
	}
}
