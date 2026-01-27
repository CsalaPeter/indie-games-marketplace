import {
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	inject,
	ViewChild,
	ElementRef,
	AfterViewInit,
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { HighlightService } from '../../services/highlight.service';
import { HttpResourceRef } from '@angular/common/http';
import { Highlight } from '../../models/highlight.model';
import { environment } from '../../../../../environments/environment';
import { Navigation } from 'swiper/modules';

register();

@Component({
	selector: 'app-highlight-carousel',
	standalone: true,
	templateUrl: './highlight-carousel.component.html',
	styleUrl: './highlight-carousel.component.css',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HighlightCarouselComponent implements AfterViewInit {
	@ViewChild('swiperRef') swiperRef!: ElementRef;
	highlightService = inject(HighlightService);
	highlights: HttpResourceRef<Highlight[]> = this.highlightService.getHighlights();

	ngAfterViewInit() {
		const swiperEl = this.swiperRef.nativeElement;

		const swiperParams = {
			navigation: true,
			effect: 'fade',
			spaceBetween: 12,
			autoplay: {
				delay: 3500,
				disableOnInteraction: false,
			},
		};

		Object.assign(swiperEl, swiperParams);
		swiperEl.initialize();
	}

	getBannerUrl(path: string): string {
		return `${environment.apiUrl}/${path}`;
	}
}
