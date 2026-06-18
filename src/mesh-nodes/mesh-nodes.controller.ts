import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MeshNodesService } from './mesh-nodes.service';

@Controller('v1/mesh-nodes')
export class MeshNodesController {
  constructor(private readonly meshNodesService: MeshNodesService) {}

  @Post()
  async create(@Body() createDto: { title: string; description: string; authorId?: string }) {
    return this.meshNodesService.create(createDto);
  }

  @Post('find-similar')
  async findSimilar(@Body() body: { text: string }) {
    const similarProblems = await this.meshNodesService.findSimilar(body.text);
    return { similarProblems };
  }

  @Get()
  async findAll() {
    return this.meshNodesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.meshNodesService.findOne(id);
  }
}
