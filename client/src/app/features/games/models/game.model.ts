export interface Game {
	id: string;
	name: string;
	slug: string;
	cardImageUrl: string;
	genre: {
		id: string;
		name: string;
	}
	tags: {
		id: string;
		name: string;
	};
	platforms: {
		id: string;
		name: string;
		icon: string;
	};
	price: number;
}
