import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class AdminLoginDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  @ApiProperty({ example: 'admin@gmail.com', description: 'Email của admin' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty({ example: '11111111', description: 'Mật khẩu admin' })
  password: string;
}

class AdminRegisterDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  @ApiProperty({ example: 'admin@gmail.com', description: 'Email của admin' })
  email: string;

  @IsString()
  @ApiProperty({ example: '11111111' })
  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty({ example: '11111111', description: 'Mật khẩu admin' })
  password: string;

  @ApiProperty({ example: 'Admin Name' })
  @IsOptional()
  @ApiProperty({
    example: 'Admin Name',
    description: 'Tên admin',
    required: false,
  })
  name?: string;
}

export { AdminLoginDto, AdminRegisterDto };
