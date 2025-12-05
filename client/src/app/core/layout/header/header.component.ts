import { Component, inject } from '@angular/core';
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

	onLogout() {
		this.authService.logout();
		this.router.navigate(['/']);
	}
}
