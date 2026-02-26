
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ExampleService } from './example.service';
import { Prisma } from '@prisma/client';

@Controller('example')
export class ExampleController {
	constructor(private readonly exampleService: ExampleService) {}

	@Post()
	create(@Body() data: Prisma.ExampleCreateInput) {
		return this.exampleService.create(data);
	}

	@Get()
	findAll() {
		return this.exampleService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.exampleService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() data: Prisma.ExampleUpdateInput) {
		return this.exampleService.update(id, data);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.exampleService.remove(id);
	}
}
