
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Topic } from '@prisma/client';

@Injectable()
export class TopicService {
	constructor(private prisma: PrismaService) {}

	async create(data: Prisma.TopicCreateInput): Promise<Topic> {
		return this.prisma.topic.create({ data });
	}

	async findAll(): Promise<Topic[]> {
		return this.prisma.topic.findMany({ include: { words: true } });
	}

	async findOne(id: string): Promise<Topic | null> {
		return this.prisma.topic.findUnique({ where: { id }, include: { words: true } });
	}

	async update(id: string, data: Prisma.TopicUpdateInput): Promise<Topic> {
		return this.prisma.topic.update({ where: { id }, data });
	}

	async remove(id: string): Promise<Topic> {
		return this.prisma.topic.delete({ where: { id } });
	}
}
