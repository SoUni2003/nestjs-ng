import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { AppService } from './app.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('api-json')
  @ApiExcludeEndpoint()
  async getOpenApiJson() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
      .setTitle('VioTech API')
      .setDescription('')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    await app.close();
    return document;
  }
}
