import { Test, TestingModule } from '@nestjs/testing';
import { MeshNodesController } from './mesh-nodes.controller';

describe('MeshNodesController', () => {
  let controller: MeshNodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeshNodesController],
    }).compile();

    controller = module.get<MeshNodesController>(MeshNodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
