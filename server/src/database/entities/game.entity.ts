import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Tag } from './tag.entity.js';
import { Platform } from './platform.entity.js';

@Entity()
export class Game {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar")
	name!: string;

	@Column("varchar")
	cardImageUrl!: string;

	@Column({ type: "decimal", precision: 2, scale: 2 })
	price!: number;

	@ManyToMany(() => Tag)
	@JoinTable()
	tags!: Tag[];

	@ManyToMany(() => Platform)
	@JoinTable()
	platforms!: Platform[];
}
