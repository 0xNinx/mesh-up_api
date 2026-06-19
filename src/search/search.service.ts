import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeshNode } from '../mesh-nodes/entities/mesh-node.entity';
import { SearchQueryDto } from './dto/search.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(MeshNode)
    private readonly meshNodeRepository: Repository<MeshNode>,
  ) {}

  async search(query: SearchQueryDto) {
    const { q, category, tags, dateFrom, dateTo, page = 1, limit = 20 } = query;
    const offset = (page - 1) * limit;

    const qb = this.meshNodeRepository
      .createQueryBuilder('node')
      .select([
        'node.id',
        'node.title',
        'node.description',
        'node.authorId',
        'node.createdAt',
        'node.updatedAt',
      ]);

    if (q) {
      qb.addSelect(
        `ts_rank(to_tsvector('english', node.title || ' ' || node.description), plainto_tsquery('english', :q))`,
        'rank',
      )
        .where(
          `to_tsvector('english', node.title || ' ' || node.description) @@ plainto_tsquery('english', :q)`,
          { q },
        )
        .orderBy('rank', 'DESC');
    } else {
      qb.orderBy('node.createdAt', 'DESC');
    }

    if (category) {
      qb.andWhere('node.category = :category', { category });
    }

    if (tags) {
      qb.andWhere(':tag = ANY(node.tags)', { tag: tags });
    }

    if (dateFrom) {
      qb.andWhere('node.createdAt >= :dateFrom', { dateFrom });
    }

    if (dateTo) {
      qb.andWhere('node.createdAt <= :dateTo', { dateTo });
    }

    const [results, total] = await Promise.all([
      qb.limit(limit).offset(offset).getRawAndEntities(),
      qb.getCount(),
    ]);

    const items = results.entities.map((entity, i) => ({
      ...entity,
      relevanceScore: results.raw[i]?.rank ? parseFloat(results.raw[i].rank) : null,
    }));

    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}