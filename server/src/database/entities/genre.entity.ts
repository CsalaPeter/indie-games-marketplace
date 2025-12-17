import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("genres")
export class Genre {
	@PrimaryGeneratedColumn("uuid")
	declare id: number;

	@Column()
	declare name: string;
}
