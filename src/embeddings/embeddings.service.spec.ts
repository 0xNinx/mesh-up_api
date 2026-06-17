import { Test, TestingModule } from '@nestjs/testing';
import { EmbeddingsService } from './embeddings.service';
import OpenAI from 'openai';

jest.mock('openai');

describe('EmbeddingsService', () => {
  let service: EmbeddingsService;
  let mockOpenAI: jest.Mocked<OpenAI>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmbeddingsService],
    }).compile();

    service = module.get<EmbeddingsService>(EmbeddingsService);
    
    // Manually initialize the mock
    (service as any).openai = {
      embeddings: {
        create: jest.fn().mockResolvedValue({
          data: [{ embedding: [0.1, 0.2, 0.3] }],
        }),
      },
    };
    mockOpenAI = (service as any).openai;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateEmbedding', () => {
    it('should call OpenAI API and return embedding', async () => {
      const result = await service.generateEmbedding('test text');
      expect(result).toEqual([0.1, 0.2, 0.3]);
      expect(mockOpenAI.embeddings.create).toHaveBeenCalledWith({
        model: 'text-embedding-3-small',
        input: 'test text',
      });
    });
  });

  describe('modelVersion', () => {
    it('should return the correct version', () => {
      expect(service.modelVersion).toBe('text-embedding-3-small');
    });
  });
});
