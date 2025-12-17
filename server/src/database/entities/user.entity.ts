import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from "typeorm";
import { Review } from "./review.entity.js";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn("uuid", { name: "user_id" })
	declare userId: string;

	@Column({ unique: true })
	declare username: string;

	@Column({ unique: true })
	declare email: string;

	@Column("varchar")
	declare password: string;

	@Column({ default: "user" })
	declare role: string;

	@OneToMany(() => Review, (review) => review.user)
	declare reviews: Review[];

	@CreateDateColumn({ name: "created_at", select: false })
	declare createdAt: Date;

	@UpdateDateColumn({ name: "updated_at", select: false })
	declare updatedAt: Date;
}
