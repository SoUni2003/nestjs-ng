import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ example: 'VioTech' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'VioTech@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '037 568 5378' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'Security manager' })
  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @ApiProperty({ example: 'VioTech Company' })
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty({ example: 'Vietnam' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    example: 'Hello, I would like to send a cooperation invitation.',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
