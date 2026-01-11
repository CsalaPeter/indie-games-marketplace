import { Genre } from './genre.model';
import { Platform } from './platform.model';
import { Review } from './review.model';
import { Tag } from './tag.model';

export interface Game {
	gameId: string;
	name: string;
	slug: string;
	cardImageUrl: string;
	filePath: string;
	description: string;
	releaseDate: string | Date;
	price: number;
	averageRating: number;
	ratingsCount: number;
	genres: Genre[];
	tags: Tag[];
	platforms: Platform[];
	reviews: Review[];
}
