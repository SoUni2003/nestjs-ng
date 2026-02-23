import { Module } from '@nestjs/common';
import { AdminAuthService } from './admin.service';
import { AdminAuthController } from './admin.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAdminStrategy } from '../auth/strategy/jwt-admin.strategy';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'changeme',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, JwtAdminStrategy],
})
export class AdminAuthModule {}
