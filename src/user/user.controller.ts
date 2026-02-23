import { Controller, Get, UseGuards } from '@nestjs/common';
import type { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtUserGuard } from '../auth/guard';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@UseGuards(JwtUserGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
