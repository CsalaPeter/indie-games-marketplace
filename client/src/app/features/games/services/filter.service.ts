import { Injectable } from "@angular/core";
import { httpResource } from "@angular/common/http";
import { Genre } from "../models/genre.model";
import { Tag } from "../models/tag.model";

@Injectable({ providedIn: 'root' })
export class FilterService {
	getGenres() {
		return httpResource<Genre[]>(() => '/api/genres', { defaultValue: [] as Genre[] });
	}

	getTags() {
		return httpResource<Tag[]>(() => '/api/tags', { defaultValue: [] as Tag[] });
	}
}
