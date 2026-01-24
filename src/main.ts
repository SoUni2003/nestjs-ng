import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const messages = errors.map((err) => {
          const constraints = err.constraints
            ? Object.values(err.constraints)
            : [];
          return `${err.property}: ${constraints.join(', ')}`;
        });
        return new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          errors: messages,
        });
      },
    }),
  );
  const port: number = Number(configService.get('PORT')) || 3001;
  await app.listen(port);
}

bootstrap();
