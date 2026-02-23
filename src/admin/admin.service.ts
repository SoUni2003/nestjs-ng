import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminLoginDto, AdminRegisterDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdminAuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: AdminRegisterDto) {
    try {
      const hashed = await bcrypt.hash(data.password, 10);
      const admin = await this.prisma.admin.create({
        data: { email: data.email, password: hashed, name: data.name },
      });
      return admin;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Email already in use');
        }
      }
      throw error;
    }
  }

  async login(data: AdminLoginDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { email: data.email },
    });
    if (!admin || !(await bcrypt.compare(data.password, admin.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: admin.id, email: admin.email, role: 'admin' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
