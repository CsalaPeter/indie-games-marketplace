import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	JoinTable,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from "typeorm";
import { Tag } from "./tag.entity.js";
import { Platform } from "./platform.entity.js";
import { Genre } from "./genre.entity.js";
import { Review } from "./review.entity.js";

@Entity("games")
export class Game {
	@PrimaryGeneratedColumn("uuid", { name: "game_id" })
	declare gameId: string;

	@Column("varchar")
	declare name: string;

	@Column({ type: "varchar", unique: true })
	declare slug: string;

	@Column({ type: "varchar", name: "card_image_url" })
	declare cardImageUrl: string;

	@Column({ type: "varchar", name: "file_path" })
	declare filePath: string;

	@Column("varchar")
	declare description: string;

	@Column({ type: "date", name: "release_date" })
	declare releaseDate: Date;

	@Column({
		type: "decimal",
		precision: 6,
		scale: 2,
		transformer: {
			to: (value: number) => value,
			from: (value: string) => parseFloat(value),
		},
	})
	declare price: number;

	@Column({
		type: "decimal",
		precision: 3,
		scale: 2,
		default: 0,
		name: "average_rating",
	})
	declare averageRating: number;

	@Column("integer", { default: 0, name: "ratings_count" })
	declare ratingsCount: number;

	@ManyToMany(() => Tag)
	@JoinTable()
	declare tags: Tag[];

	@ManyToMany(() => Platform)
	@JoinTable()
	declare platforms: Platform[];

	@ManyToMany(() => Genre)
	@JoinTable()
	declare genres: Genre[];

	@OneToMany(() => Review, (review) => review.game)
	declare reviews: Review[];

	@CreateDateColumn({ name: "created_at", select: false })
	declare createdAt: Date;

	@UpdateDateColumn({ name: "updated_at", select: false })
	declare updatedAt: Date;
}
