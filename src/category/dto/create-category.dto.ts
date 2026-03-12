import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Smart Home', description: 'Category name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'Description...',
    description: 'Category description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'https://...',
    description: 'Category logo URL',
  })
  @IsOptional()
  @IsString()
  logo_url?: string;
}
