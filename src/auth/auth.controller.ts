import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, UserLoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  signup(@Body() dto: RegisterDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: UserLoginDto) {
    return this.authService.login(dto);
  }
}
