import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { MeshNode } from '../../mesh-nodes/entities/mesh-node.entity'; // Adjust import path to match your project layout

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  icon: string; // Storing Lucide icon string identifiers (e.g., 'Server', 'Heart')

  @Column()
  color: string; // Storing hex codes or Tailwind color configurations (e.g., '#EF4444')

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => MeshNode, (meshNode) => meshNode.category)
  meshNodes: MeshNode[];
}