import {
	Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn
} from 'typeorm';
import { Tag } from './tag.entity.js';
import { Platform } from './platform.entity.js';
import { Genre } from './genre.entity.js';

@Entity()
export class Game {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;

	@Column("varchar")
	cardImageUrl!: string;

	@Column({
		type: "decimal", precision: 6, scale: 2, transformer: {
			to: (value: number) => value,
			from: (value: string) => parseFloat(value)
		}
	})
	price!: number;

	@ManyToMany(() => Tag)
	@JoinTable()
	tags!: Tag[];

	@ManyToMany(() => Platform)
	@JoinTable()
	platforms!: Platform[];

	@ManyToMany(() => Genre)
	@JoinTable()
	genres!: Genre[];

	@CreateDateColumn({ name: "created_at", select: false })
	created_at!: Date;

	@UpdateDateColumn({ name: "updated_at", select: false })
	updated_at!: Date;
}
