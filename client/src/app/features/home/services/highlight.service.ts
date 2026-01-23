import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Highlight } from '../models/highlight.model';

@Injectable({ providedIn: 'root' })
export class HighlightService {
	getHighlights() {
		return httpResource<Highlight[]>(() => '/api/highlights', {
			defaultValue: [] as Highlight[],
		});
	}
}
