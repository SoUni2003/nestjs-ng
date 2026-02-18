import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto, UserLoginDto } from './dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(data: RegisterDto) {
    try {
      const password = await bcrypt.hash(data.password, 10);

      const user = await this.userService.create({
        name: data.name,
        email: data.email,
        password,
      });

      const token = this.jwtService.sign({
        sub: user.id,
        email: user.email,
        name: user.name,
      });

      return { message: 'User registered successfully', token };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Email already in use');
        }
      }
      throw error;
    }
  }

  async login(data: UserLoginDto) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new UnauthorizedException('Password not correct');

    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        email: user.email,
        role: 'user',
      }),
    };
  }
}
