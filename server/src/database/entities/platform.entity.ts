import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Platform {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column()
	icon!: string;
}
