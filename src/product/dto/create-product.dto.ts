import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductType } from '../enum/product-type.enum';

export class DescriptionDto {
  @ApiPropertyOptional({
    example: 'Tiêu đề',
    description: 'Tiêu đề (có thể có hoặc không)',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: 'Nội dung mô tả',
    description: 'Nội dung mô tả (bắt buộc)',
  })
  @IsString()
  description: string;
}

export class StrengthBlockDto {
  @ApiProperty({
    example: 'Thế mạnh',
    description: 'Thế mạnh',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: [
      {
        name: 'Độ bền',
        image: 'https://example.com/strength.jpg',
        descriptions: [
          { title: 'Thông minh', description: 'Tự học' },
          { title: 'Chống nước', description: 'IP67' },
        ],
      },
    ],
    description:
      'Danh sách block thế mạnh (mỗi block có name, image, descriptions)',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StrengthBlockDto)
  strengths?: StrengthBlockDto[];
}
export class ProductSpecificationDto {
  @ApiProperty({
    example: 'Thông số kỹ thuật',
    description: 'Tên block thông số',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'Ảnh thông số',
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({
    example: [
      { title: 'Kích thước', description: '225*205*85 mm' },
      { description: 'Vật liệu: Hợp kim nhôm+ABS+Kính' },
    ],
    description:
      'Danh sách mô tả chi tiết (mỗi phần có title optional, description bắt buộc)',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DescriptionDto)
  descriptions?: DescriptionDto[];
}

export class ProductFeatureDto {
  @ApiProperty({ example: 'Bảng đặc tính', description: 'Tên block đặc tính' })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'Ảnh đặc tính',
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({
    example: [
      { title: 'Đặc tính', description: 'Chống nước IP67' },
      { description: 'Bền bỉ, chống va đập' },
    ],
    description:
      'Danh sách mô tả chi tiết (mỗi phần có title optional, description bắt buộc)',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DescriptionDto)
  descriptions?: DescriptionDto[];
}

export class ApplicationScenarioDto {
  @ApiProperty({
    example: 'Kịch bản ứng dụng',
    description: 'Tên block kịch bản',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'Ảnh kịch bản',
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({
    example: [
      { title: 'Ứng dụng', description: 'Giám sát xe hàng' },
      { description: 'Theo dõi container' },
    ],
    description:
      'Danh sách mô tả chi tiết (mỗi phần có title optional, description bắt buộc)',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DescriptionDto)
  descriptions?: DescriptionDto[];
}

export class CreateProductDto {
  @ApiProperty({
    example: ProductType.PRODUCT,
    description: 'Loại sản phẩm hoặc công nghệ',
    enum: ProductType,
  })
  @IsEnum(ProductType)
  type: ProductType;

  @ApiPropertyOptional({
    example: 'Super Widget',
    description: 'Tên sản phẩm (có thể có hoặc không)',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'A powerful widget for all your needs.',
    description: 'Mô tả sản phẩm (bắt buộc)',
  })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    example: {
      name: 'Thế mạnh',
      image: 'https://example.com/image.jpg',
      descriptions: [
        {
          title: 'Mở khóa đa phương thức',
          description:
            'Vân tay, thẻ, mật khẩu, ứng dụng di động, mật khẩu tạm thời',
        },
        {
          title: 'Thiết kế sang trọng',
          description:
            'Hợp kim nhôm và kính, phù hợp nhiều phong cách nội thất',
        },
      ],
    },
    description: 'Block thế mạnh gồm name, image và descriptions',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => StrengthBlockDto)
  strengths?: StrengthBlockDto;

  @ApiPropertyOptional({
    example: [
      {
        name: 'Thông số kỹ thuật',
        image: 'https://example.com/image.jpg',
        descriptions: [
          { title: 'Kích thước', description: '225*205*85 mm' },
          { description: 'Vật liệu: Hợp kim nhôm+ABS+Kính' },
        ],
      },
    ],
    description: 'Danh sách thông số kỹ thuật',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductSpecificationDto)
  specifications?: ProductSpecificationDto[];

  @ApiPropertyOptional({
    example: [
      {
        name: 'Chống nước',
        image: 'https://example.com/image.jpg',
        descriptions: [
          { title: 'Đặc tính', description: 'Chống nước IP67' },
          { description: 'Bền bỉ, chống va đập' },
        ],
      },
    ],
    description: 'Danh sách đặc tính sản phẩm',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductFeatureDto)
  features?: ProductFeatureDto[];

  @ApiPropertyOptional({
    example: [
      {
        name: 'Kịch bản ứng dụng',
        image: 'https://example.com/image.jpg',
        descriptions: [
          { title: 'Ứng dụng', description: 'Giám sát xe hàng' },
          { description: 'Theo dõi container' },
        ],
      },
    ],
    description: 'Danh sách kịch bản ứng dụng',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ApplicationScenarioDto)
  applicationScenarios?: ApplicationScenarioDto[];

  @ApiPropertyOptional({
    description: 'List of related product IDs (UUIDs)',
    example: [],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  relatedProductIds?: string[];

  @ApiProperty({
    description: 'Category ID of the product',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  categoryId: string;
}
