import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
} from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	declare userId: number;

	@Column({ unique: true })
	declare userName: string;

	@Column({ unique: true })
	declare email: string;

	@Column("varchar")
	declare password: string;

	@Column({ default: "user" })
	declare role: string;

	@CreateDateColumn({ name: "created_at", select: false })
	declare created_at: Date;
}
