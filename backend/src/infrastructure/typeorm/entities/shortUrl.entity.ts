import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "Shorturl" })
export class ShortUrlEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  longUrl: string;

  @Column()
  shortenedUrl: string;

  @Column({ default: 0 })
  visitorsCount: number;

  constructor(data: Partial<ShortUrlEntity> = {}) {
    Object.assign(this, data);
  }
}
