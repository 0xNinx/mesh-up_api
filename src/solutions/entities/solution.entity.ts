import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('solutions')
export class Solution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  meshNodeId: number;

  @Column('text')
  content: string;

  @Column()
  authorId: string;

  @Column({ type: 'decimal', nullable: true })
  score: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
