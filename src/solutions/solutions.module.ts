import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solution } from './entities/solution.entity';
import { SolutionRevision } from './entities/solution-revision.entity';
import { SolutionsService } from './solutions.service';
import { SolutionsController } from './solutions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Solution, SolutionRevision])],
  providers: [SolutionsService],
  controllers: [SolutionsController],
})
export class SolutionsModule {}
