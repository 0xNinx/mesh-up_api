import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('mesh_nodes')
export class MeshNode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  authorId: string;

  @Column('vector', { nullable: true, length: 1536 })
  embedding: number[];

  @Column({ type: 'decimal', nullable: true })
  embeddingVersion: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
