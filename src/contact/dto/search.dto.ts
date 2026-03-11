import { IntersectionType, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';

class ContactFilterDto {
  @ApiPropertyOptional({ description: 'Search keyword for contact' })
  @IsOptional()
  @IsString()
  searchKey?: string;
}

export class SearchContactDto extends IntersectionType(
  IntersectionType(PaginationDto, ContactFilterDto),
) {}
