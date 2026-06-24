import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SearchService } from './search.service';
import { MeshNode } from '../mesh-nodes/entities/mesh-node.entity';

const mockQb = {
  select: jest.fn().mockReturnThis(),
  addSelect: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  offset: jest.fn().mockReturnThis(),
  getRawAndEntities: jest.fn(),
  getCount: jest.fn(),
};

const mockRepo = {
  createQueryBuilder: jest.fn(() => mockQb),
};

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        { provide: getRepositoryToken(MeshNode), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return paginated results with relevance score when q is provided', async () => {
    const entity = { id: 1, title: 'Traffic issue', description: 'Lagos traffic', createdAt: new Date(), updatedAt: new Date() };
    mockQb.getRawAndEntities.mockResolvedValue({ entities: [entity], raw: [{ rank: '0.75' }] });
    mockQb.getCount.mockResolvedValue(1);

    const result = await service.search({ q: 'traffic', page: 1, limit: 20 });

    expect(result.data[0].relevanceScore).toBe(0.75);
    expect(result.meta.total).toBe(1);
    expect(result.meta.totalPages).toBe(1);
    expect(mockQb.where).toHaveBeenCalled();
  });

  it('should order by createdAt when no query string provided', async () => {
    mockQb.getRawAndEntities.mockResolvedValue({ entities: [], raw: [] });
    mockQb.getCount.mockResolvedValue(0);

    await service.search({ page: 1, limit: 20 });

    expect(mockQb.where).not.toHaveBeenCalled();
    expect(mockQb.orderBy).toHaveBeenCalledWith('node.createdAt', 'DESC');
  });

  it('should apply dateFrom and dateTo filters', async () => {
    mockQb.getRawAndEntities.mockResolvedValue({ entities: [], raw: [] });
    mockQb.getCount.mockResolvedValue(0);

    await service.search({ dateFrom: '2026-01-01', dateTo: '2026-12-31', page: 1, limit: 20 });

    expect(mockQb.andWhere).toHaveBeenCalledWith('node.createdAt >= :dateFrom', { dateFrom: '2026-01-01' });
    expect(mockQb.andWhere).toHaveBeenCalledWith('node.createdAt <= :dateTo', { dateTo: '2026-12-31' });
  });
});