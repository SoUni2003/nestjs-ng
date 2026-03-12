import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAdminGuard } from 'src/auth/guard';
import { ApplyApiQueryFromDto } from 'src/common/utils/helper';
import { SearchProductDto } from './dto/search.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAdminGuard)
  @ApiBearerAuth()
  @Post('/admin/product')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApplyApiQueryFromDto(SearchProductDto)
  @Get('/products')
  findAll(@Query() query: SearchProductDto) {
    return this.productService.findAll(query);
  }

  @Get('/products/:slug')
  findOne(@Param('slug') slug: string) {
    return this.productService.findOne(slug);
  }

  @Get('/products/:slug/related')
  findRelated(@Param('slug') slug: string) {
    return this.productService.findRelated(slug);
  }

  @UseGuards(JwtAdminGuard)
  @ApiBearerAuth()
  @Put('/admin/product/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @UseGuards(JwtAdminGuard)
  @ApiBearerAuth()
  @Delete('/admin/product/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
