import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { BlogModule } from './blog/blog.module';
import { AdminAuthModule } from './admin';
import { WordModule } from './word/word.module';
import { TopicModule } from './topic/topic.module';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    AdminAuthModule,
    UserModule,
    PostModule,
    PrismaModule,
    BlogModule,
    WordModule,
    TopicModule,
    ExampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
