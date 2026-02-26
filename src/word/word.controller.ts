
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { WordService } from './word.service';
import { Prisma } from '@prisma/client';

@Controller('word')
export class WordController {
	constructor(private readonly wordService: WordService) {}

	@Post()
	create(@Body() data: Prisma.WordCreateInput) {
		return this.wordService.create(data);
	}

	@Get()
	findAll() {
		return this.wordService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.wordService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() data: Prisma.WordUpdateInput) {
		return this.wordService.update(id, data);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.wordService.remove(id);
	}
}
