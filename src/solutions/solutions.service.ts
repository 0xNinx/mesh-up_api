import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solution } from './entities/solution.entity';
import { SolutionRevision } from './entities/solution-revision.entity';

const EDIT_WINDOW_MS = 24 * 60 * 60 * 1000;

function computeScore(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.min(100, Math.round((words / 50) * 100));
}

@Injectable()
export class SolutionsService {
  constructor(
    @InjectRepository(Solution)
    private readonly solutionRepo: Repository<Solution>,
    @InjectRepository(SolutionRevision)
    private readonly revisionRepo: Repository<SolutionRevision>,
  ) {}

  async create(dto: { meshNodeId: number; content: string; authorId: string }) {
    const solution = this.solutionRepo.create({
      ...dto,
      score: computeScore(dto.content),
    });
    return this.solutionRepo.save(solution);
  }

  async update(id: number, dto: { content: string; editorId: string }) {
    const solution = await this.solutionRepo.findOneBy({ id });
    if (!solution) throw new NotFoundException('Solution not found');

    const age = Date.now() - solution.createdAt.getTime();
    if (age > EDIT_WINDOW_MS) {
      throw new BadRequestException('Edit window of 24 hours has expired');
    }

    // Store revision of current state before updating
    await this.revisionRepo.save(
      this.revisionRepo.create({
        solutionId: solution.id,
        content: solution.content,
        editedBy: dto.editorId,
        previousScore: solution.score,
      }),
    );

    solution.content = dto.content;
    solution.score = computeScore(dto.content);
    return this.solutionRepo.save(solution);
  }

  async findHistory(id: number) {
    const exists = await this.solutionRepo.existsBy({ id });
    if (!exists) throw new NotFoundException('Solution not found');

    return this.revisionRepo.find({
      where: { solutionId: id },
      order: { editedAt: 'DESC' },
    });
  }
}
