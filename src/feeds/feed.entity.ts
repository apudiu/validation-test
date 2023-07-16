import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateTime } from 'luxon';

export enum FeedType {
  Image = 'image',
  Video = 'video',
  Text = 'text',
}

@Entity()
export class Feed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  body: string;

  @Column({ nullable: true })
  attachment: string;

  @Column()
  type: FeedType;

  @CreateDateColumn({ type: 'timestamp', default: 'NOW()' })
  createdAt: DateTime;

  @UpdateDateColumn({ type: 'timestamp', default: 'NOW()' })
  updatedAt: DateTime;
}
