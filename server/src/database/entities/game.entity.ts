import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	JoinTable,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";
import { Tag } from "./tag.entity.js";
import { Platform } from "./platform.entity.js";
import { Genre } from "./genre.entity.js";

@Entity()
export class Game {
	@PrimaryGeneratedColumn()
	declare id: number;

	@Column("varchar")
	declare name: string;

	@Column({ type: "varchar", unique: true })
	declare slug: string;

	@Column("varchar")
	declare cardImageUrl: string;

	@Column("varchar")
	declare description: string;

	@Column("date")
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

	@ManyToMany(() => Tag)
	@JoinTable()
	declare tags: Tag[];

	@ManyToMany(() => Platform)
	@JoinTable()
	declare platforms: Platform[];

	@ManyToMany(() => Genre)
	@JoinTable()
	declare genres: Genre[];

	@CreateDateColumn({ name: "created_at", select: false })
	declare created_at: Date;

	@UpdateDateColumn({ name: "updated_at", select: false })
	declare updated_at: Date;
}
