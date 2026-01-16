import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class AuthDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export { AuthDto };
