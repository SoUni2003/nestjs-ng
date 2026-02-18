import { Body, Controller, Post } from '@nestjs/common';
import { AdminAuthService } from './admin.service';
import { AdminLoginDto, AdminRegisterDto } from './dto';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('register')
  async register(@Body() dto: AdminRegisterDto) {
    return this.adminAuthService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: AdminLoginDto) {
    return this.adminAuthService.login(dto);
  }
}
