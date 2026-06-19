import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeshNode } from '../mesh-nodes/entities/mesh-node.entity';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MeshNode])],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}