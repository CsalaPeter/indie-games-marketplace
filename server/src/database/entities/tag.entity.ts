import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("tags")
export class Tag {
	@PrimaryGeneratedColumn("uuid")
	declare id: number;

	@Column()
	declare name: string;
}
