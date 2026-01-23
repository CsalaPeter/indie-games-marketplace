import { Component } from '@angular/core';
import { HighlightCarouselComponent } from '../../components/highlight-carousel/highlight-carousel.component';

@Component({
	selector: 'app-home-page',
	standalone: true,
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
	imports: [HighlightCarouselComponent],
})
export class HomePageComponent {}
