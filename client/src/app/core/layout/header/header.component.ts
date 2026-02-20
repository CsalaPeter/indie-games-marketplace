import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GameSearchService } from '../../services/search.service';

@Component({
	selector: 'app-layout-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.css',
	imports: [RouterLink, FormsModule, CommonModule],
})
export class HeaderComponent {
	readonly authService = inject(AuthService);
	private router = inject(Router);
	readonly searchService = inject(GameSearchService);
	readonly isOpen = signal(false);
	readonly isVisible = signal(false);
	elementRef = inject(ElementRef);
	timer: number = 0;

	@HostListener('document:click', ['$event'])
	onClickOutside(event: Event) {
		if (!this.elementRef.nativeElement.contains(event.target)) {
			setTimeout(() => {
				this.isVisible.set(false);
			}, 500);
			this.searchService.updateSearchTerm('');
		}
	}

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

	showSearch() {
		this.isVisible.set(true);
	}

	hideSearch() {
		this.isVisible.set(false);
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

	get results() {
		return this.searchService.searchResults.value();
	}

	get isLoading() {
		return this.searchService.searchResults.isLoading();
	}

	get term() {
		return this.searchService.debouncedSearchTerm();
	}

	hasResults() {
		if (this.searchService.debouncedSearchTerm().length >= 3) {
			return true;
		}
		return false;
	}

	onSelectItem() {
		this.searchService.updateSearchTerm('');
		setTimeout(() => {
			this.isVisible.set(false);
		}, 500);
	}
}
