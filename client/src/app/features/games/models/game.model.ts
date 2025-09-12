export interface Game {
	id: string;
	name: string;
	cardImageUrl: string;
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
