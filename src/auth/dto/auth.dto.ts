import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class AuthDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}

export { AuthDto };
