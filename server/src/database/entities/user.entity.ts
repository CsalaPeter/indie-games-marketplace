import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
} from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id!: number;

	@Column({ unique: true })
	userName!: string;

	@Column({ unique: true })
	email!: string;

	@Column("varchar")
	password!: string;

	@Column({ default: "user" })
	role!: string;

	@CreateDateColumn({ name: "created_at", select: false })
	created_at!: Date;
}
