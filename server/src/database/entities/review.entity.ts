import {
	Check,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	Relation,
	Unique,
	UpdateDateColumn,
} from "typeorm";
import { Game } from "./game.entity.js";
import { User } from "./user.entity.js";

@Entity("reviews")
@Unique(["userId", "gameId"])
@Check(`"rating" >= 1 AND "rating" <= 5`)
export class Review {
	@PrimaryGeneratedColumn("uuid", { name: "review_id" })
	declare reviewId: string;

	@Column("integer")
	declare rating: number;

	@Column("text", { nullable: true })
	declare comment: string;

	@Column({ name: "user_id" })
	declare userId: string;

	@ManyToOne(() => User, (user) => user.reviews)
	@JoinColumn({ name: "user_id" })
	declare user: Relation<User>;

	@Column({ name: "game_id" })
	declare gameId: string;

	@ManyToOne(() => Game, (game) => game.reviews)
	@JoinColumn({ name: "game_id" })
	declare game: Relation<Game>;

	@CreateDateColumn({ name: "created_at" })
	declare createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	declare updatedAt: Date;
}
