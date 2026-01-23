import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { HighlightService } from '../../services/highlight.service';
import { HttpResourceRef } from '@angular/common/http';
import { Highlight } from '../../models/highlight.model';
import { environment } from '../../../../../environments/environment';

register();

@Component({
	selector: 'app-highlight-carousel',
	standalone: true,
	templateUrl: './highlight-carousel.component.html',
	styleUrl: './highlight-carousel.component.css',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HighlightCarouselComponent {
	highlightService = inject(HighlightService);
	highlights: HttpResourceRef<Highlight[]> = this.highlightService.getHighlights();

	getBannerUrl(path: string): string {
		return `${environment.apiUrl}/${path}`;
	}
}
