import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("platforms")
export class Platform {
	@PrimaryGeneratedColumn("uuid")
	declare id: number;

	@Column()
	declare name: string;
}
