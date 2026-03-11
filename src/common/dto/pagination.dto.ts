import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  currentPage?: number;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  perPage?: number;

  //   @ApiPropertyOptional({ enum: ['asc', 'desc'], default: 'desc' })
  //   @IsOptional()
  //   @IsIn(['asc', 'desc'])
  //   sortBy?: 'asc' | 'desc' ;

  //   @ApiPropertyOptional({ default: 'createdAt' })
  //   @IsOptional()
  //   @IsString()
  //   sortName?: string = 'createdAt';
}
