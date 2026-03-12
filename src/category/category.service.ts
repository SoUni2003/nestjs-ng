import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { toSlug } from '../common/utils/helper';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    let slug = (data.name ? toSlug(data.name) : '') || crypto.randomUUID();

    let slugExists = await this.prisma.category.findUnique({ where: { slug } });
    while (slugExists) {
      slug = `${slug}-${Math.floor(Math.random() * 10000)}`;
      slugExists = await this.prisma.category.findUnique({ where: { slug } });
    }

    return this.prisma.category.create({
      data: {
        ...data,
        slug,
      },
    });
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: string) {
    let category = await this.prisma.category.findUnique({
      where: { slug: id },
    });

    if (!category) {
      category = await this.prisma.category.findUnique({
        where: { id },
      });
    }

    return category;
  }

  async update(id: string, data: UpdateCategoryDto) {
    const updateData: Prisma.CategoryUpdateInput = { ...data };
    return this.prisma.category.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
