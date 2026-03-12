import { IntersectionType, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';

class ProductFilterDto {
  @ApiPropertyOptional({ description: 'Search keyword for product' })
  @IsOptional()
  @IsString()
  searchKey?: string;

  @ApiPropertyOptional({ description: 'Category slug or id' })
  @IsOptional()
  @IsString()
  category?: string;
}

export class SearchProductDto extends IntersectionType(
  IntersectionType(PaginationDto, ProductFilterDto),
) {}
