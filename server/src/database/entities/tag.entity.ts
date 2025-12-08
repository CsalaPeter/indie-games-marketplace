import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag {
	@PrimaryGeneratedColumn()
	declare id: number;

	@Column()
	declare name: string;
}
