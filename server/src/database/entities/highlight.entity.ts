import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("highlight")
export class Highlight {
	@PrimaryGeneratedColumn()
	declare highlightId: number;

	@Column()
	declare bannerUrl: string;
}
