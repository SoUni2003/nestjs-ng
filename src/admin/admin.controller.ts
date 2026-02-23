import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import type { Admin } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtAdminGuard } from '../auth/guard/jwt.admin.guard';
import { AdminAuthService } from './admin.service';
import { AdminLoginDto, AdminRegisterDto } from './dto';
import { ApiBearerAuth } from '@nestjs/swagger';

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
  @ApiBearerAuth()
  @UseGuards(JwtAdminGuard)
  @Get('me')
  getMe(@GetUser() admin: Admin) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = admin;
    return result;
  }
}
