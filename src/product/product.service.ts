import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductType } from './enum/product-type.enum';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';
import {
  toSlug,
  wrapCreate,
  parseDescriptions,
  parseJson,
} from '../common/utils/helper';
import { StrengthBlockDto } from './dto/create-product.dto';
import { SearchProductDto } from './dto/search.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    if (data.type === ProductType.PRODUCT) {
      if (!data.strengths || !data.specifications) {
        throw new Error('Product must have strengths and specifications');
      }
    }
    if (data.type === ProductType.TECHNOLOGY) {
      if (!data.strengths || !data.features || !data.applicationScenarios) {
        throw new Error(
          'Technology must have strengths, features, and applicationScenarios',
        );
      }
    }
    let slug = (data.name ? toSlug(data.name) : '') || crypto.randomUUID();

    let slugExists = await this.prisma.product.findUnique({ where: { slug } });
    while (slugExists) {
      slug = `${slug}-${Math.floor(Math.random() * 10000)}`;
      slugExists = await this.prisma.product.findUnique({ where: { slug } });
    }

    if (!data.name) throw new Error('Product name is required');

    const {
      relatedProductIds,
      strengths,
      specifications,
      features,
      applicationScenarios,
      ...rest
    } = data;

    const productData: Prisma.ProductUncheckedCreateInput = {
      ...rest,
      slug,
      name: data.name,
      strengths: strengths ? JSON.stringify(strengths) : undefined,
      relatedProducts: relatedProductIds
        ? {
            connect: relatedProductIds.map((id) => ({ id })),
          }
        : undefined,
      specifications: wrapCreate(
        specifications?.map((item) => ({
          ...item,
          descriptions: item.descriptions
            ? JSON.stringify(item.descriptions)
            : undefined,
        })),
      ),
      features: wrapCreate(
        features?.map((item) => ({
          ...item,
          descriptions: item.descriptions
            ? JSON.stringify(item.descriptions)
            : undefined,
        })),
      ),
      applicationScenarios: wrapCreate(
        applicationScenarios?.map((item) => ({
          ...item,
          descriptions: item.descriptions
            ? JSON.stringify(item.descriptions)
            : undefined,
        })),
      ),
    };

    return this.prisma.product.create({ data: productData });
  }

  async findAll(query: SearchProductDto) {
    const { currentPage, perPage, searchKey, category } = query;
    const skip = ((currentPage ?? 1) - 1) * (perPage ?? 10);
    const where: Prisma.ProductWhereInput = {};

    if (searchKey) {
      where.OR = [
        { name: { contains: searchKey, mode: 'insensitive' } },
        { description: { contains: searchKey, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = {
        OR: [{ slug: category }, { id: category }],
      };
    }

    const [total, products] = await Promise.all([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        skip,
        take: perPage ?? 10,
        where,
        include: {
          specifications: true,
          applicationScenarios: true,
          features: true,
          relatedProducts: true,
          category: true,
        },
      }),
    ]);
    const data = products.map((product) => ({
      slug: product.slug,
      name: product.name,
      type: product.type,
      title: product.name,
      image: product.image,
      description: product.description,
      category: product.category,
    }));
    return {
      data,
      total_items: total,
    };
  }

  async findRelated(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        relatedProducts: {
          include: {
            category: true,
          },
        },
        relatedBy: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!product) return [];

    const allRelated = [...product.relatedProducts, ...product.relatedBy];

    const uniqueRelated = Array.from(
      new Map(allRelated.map((item) => [item.id, item])).values(),
    ).filter((p) => p.id !== product.id);

    return uniqueRelated.map((p) => ({
      slug: p.slug,
      name: p.name,
      image: p.image,
      category: p.category,
      type: p.type,
      description: p.description,
    }));
  }

  async findOne(id: string) {
    let product = await this.prisma.product.findUnique({
      where: { slug: id },
      include: {
        specifications: true,
        applicationScenarios: true,
        features: true,
        relatedProducts: { include: { category: true } },
        relatedBy: { include: { category: true } },
        category: true,
      },
    });
    if (!product) {
      product = await this.prisma.product.findUnique({
        where: { id },
        include: {
          specifications: true,
          applicationScenarios: true,
          features: true,
          relatedProducts: { include: { category: true } },
          relatedBy: { include: { category: true } },
          category: true,
        },
      });
    }
    if (!product) return null;
    let mainImage: string | null = product.image ?? null;
    if (
      !mainImage &&
      product.specifications &&
      product.specifications.length > 0
    ) {
      mainImage = product.specifications[0].image ?? null;
    } else if (!mainImage && product.features && product.features.length > 0) {
      mainImage = product.features[0].image ?? null;
    } else if (
      !mainImage &&
      product.applicationScenarios &&
      product.applicationScenarios.length > 0
    ) {
      mainImage = product.applicationScenarios[0].image ?? null;
    }
    return {
      slug: product.slug,
      name: product.name,
      type: product.type,
      title: product.name,
      image: mainImage,
      description: product.description,
      strengths:
        typeof product.strengths === 'string'
          ? parseJson<StrengthBlockDto>(product.strengths)
          : product.strengths,
      specifications: parseDescriptions(product.specifications),
      features: parseDescriptions(product.features),
      applicationScenarios: parseDescriptions(product.applicationScenarios),
      relatedProducts: [...product.relatedProducts, ...product.relatedBy],
      category: product.category,
    };
  }

  async update(id: string, data: UpdateProductDto) {
    const {
      relatedProductIds,
      strengths,
      specifications,
      features,
      applicationScenarios,
      ...rest
    } = data;

    const updateData: Prisma.ProductUncheckedUpdateInput = {
      ...rest,
      strengths: strengths ? JSON.stringify(strengths) : undefined,
      relatedProducts: relatedProductIds
        ? {
            set: relatedProductIds.map((id) => ({ id })),
          }
        : undefined,
      specifications: wrapCreate(
        specifications?.map((item) => ({
          ...item,
          descriptions: item.descriptions
            ? JSON.stringify(item.descriptions)
            : undefined,
        })),
      ),
      features: wrapCreate(
        features?.map((item) => ({
          ...item,
          descriptions: item.descriptions
            ? JSON.stringify(item.descriptions)
            : undefined,
        })),
      ),
      applicationScenarios: wrapCreate(
        applicationScenarios?.map((item) => ({
          ...item,
          descriptions: item.descriptions
            ? JSON.stringify(item.descriptions)
            : undefined,
        })),
      ),
    };
    if (data.name) updateData.name = data.name;
    return this.prisma.product.update({ where: { id }, data: updateData });
  }

  async remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
