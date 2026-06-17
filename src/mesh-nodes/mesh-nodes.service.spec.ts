import { Test, TestingModule } from '@nestjs/testing';
import { MeshNodesService } from './mesh-nodes.service';

describe('MeshNodesService', () => {
  let service: MeshNodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeshNodesService],
    }).compile();

    service = module.get<MeshNodesService>(MeshNodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
