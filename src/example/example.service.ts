import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Example } from '@prisma/client';

@Injectable()
export class ExampleService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ExampleCreateInput): Promise<Example> {
    return this.prisma.example.create({ data });
  }

  async findAll(): Promise<Example[]> {
    return this.prisma.example.findMany({ include: { word: true } });
  }

  async findOne(id: string): Promise<Example | null> {
    return this.prisma.example.findUnique({
      where: { id },
      include: { word: true },
    });
  }

  async update(id: string, data: Prisma.ExampleUpdateInput): Promise<Example> {
    return this.prisma.example.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Example> {
    return this.prisma.example.delete({ where: { id } });
  }
}
