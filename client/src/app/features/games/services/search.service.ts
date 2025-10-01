import { inject, Injectable, signal, WritableSignal, effect, Injector } from '@angular/core';
import { httpResource, HttpResourceRequest } from '@angular/common/http';
import { Game } from '../models/game.model';

@Injectable({ providedIn: 'root' })
export class GameSearchService {
	private readonly injector = inject(Injector);
	readonly rawSearchTerm: WritableSignal<string> = signal('');
	readonly debouncedSearchTerm: WritableSignal<string> = signal('');
	private debounceTimer: number | undefined;

	constructor() {
		effect(() => {
			const term = this.rawSearchTerm();

			if (this.debounceTimer) {
				clearTimeout(this.debounceTimer);
			}

			this.debounceTimer = setTimeout(() => {
				this.debouncedSearchTerm.set(term);
			}, 300);

		}, { injector: this.injector });
	}

	readonly searchResults = httpResource<Game[]>(() => {
		const term = this.debouncedSearchTerm();

		if (!term || term.length < 3) {
			return undefined;
		}

		const request: HttpResourceRequest = {
			url: '/api/search',
			method: 'GET',
			params: { q: term },
		};

		return request;
	}, {
		defaultValue: []
	});

	updateSearchTerm(term: string): void {
		this.rawSearchTerm.set(term);
	}

	getRawSearchTerm(): string {
		return this.rawSearchTerm();
	}
}
