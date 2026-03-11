import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateContactDto) {
    return await this.prisma.contact.create({ data: dto });
  }

  async findAll(query: { currentPage?: number; perPage?: number }) {
    const currentPage = query.currentPage ?? 1;
    const perPage = query.perPage ?? 10;
    const skip = (currentPage - 1) * perPage;
    const [total_items, data] = await Promise.all([
      this.prisma.contact.count(),
      this.prisma.contact.findMany({ skip, take: perPage }),
    ]);
    return {
      data,
      total_items,
    };
  }

  async findOne(id: string) {
    return await this.prisma.contact.findUnique({ where: { id } });
  }

  async remove(id: string) {
    return await this.prisma.contact.delete({ where: { id } });
  }
}
