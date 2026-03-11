import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ContactService } from './contact.service';
import { JwtAdminGuard } from 'src/auth/guard';

@Module({
  controllers: [ContactController],
  providers: [ContactService, PrismaService, JwtAdminGuard],
})
export class ContactModule {}
