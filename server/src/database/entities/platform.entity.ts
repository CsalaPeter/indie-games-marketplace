import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Platform {
	@PrimaryGeneratedColumn()
	declare id: number;

	@Column()
	declare name: string;
}
