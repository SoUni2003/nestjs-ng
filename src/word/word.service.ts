import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Word } from '@prisma/client';

@Injectable()
export class WordService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.WordCreateInput): Promise<Word> {
    return await this.prisma.word.create({ data });
  }

  async findAll(): Promise<Word[]> {
    return this.prisma.word.findMany({
      include: { examples: true, topic: true },
    });
  }

  async findOne(id: string): Promise<Word | null> {
    return this.prisma.word.findUnique({
      where: { id },
      include: { examples: true, topic: true },
    });
  }

  async update(id: string, data: Prisma.WordUpdateInput): Promise<Word> {
    return this.prisma.word.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Word> {
    return this.prisma.word.delete({ where: { id } });
  }
}
