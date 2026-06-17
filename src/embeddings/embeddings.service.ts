import { Injectable, OnModuleInit } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class EmbeddingsService implements OnModuleInit {
  private openai: OpenAI;

  onModuleInit() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const response = await this.openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return response.data[0].embedding;
  }

  get modelVersion(): string {
    return 'text-embedding-3-small';
  }
}
