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

	@HostListener('document:click', ['$event'])
	clickout(event: Event) {
		if (!this.elementRef.nativeElement.contains(event.target)) {
			this.isOpen.set(false);
		}
	}

	toggleDropdown() {
		this.isOpen.update((value) => !value);
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
