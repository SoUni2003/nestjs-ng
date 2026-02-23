import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @ApiProperty({ example: 'User Name', description: 'Tên user' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  @ApiProperty({ example: 'user@gmail.com', description: 'Email user' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty({ example: '12345678', description: 'Mật khẩu user' })
  password: string;
}

class UserLoginDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  @ApiProperty({ example: 'user@gmail.com', description: 'Email user' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty({ example: '12345678', description: 'Mật khẩu user' })
  password: string;
}

export { RegisterDto, UserLoginDto };
