import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Genre {
	@PrimaryGeneratedColumn()
	declare id: number;

	@Column()
	declare name: string;
}
