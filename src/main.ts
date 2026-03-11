import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      // console.log('[CORS] request from:', origin);
      const whitelist = (process.env.CORS_ORIGINS || '')
        .split(',')
        .map((url) => url.trim());
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`${origin} is not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Authorization',
      'Content-Type',
      'Accept',
      'Origin',
      'X-Requested-With',
    ],
  });
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
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

  const config = new DocumentBuilder()
    .setTitle('API Documentation - VioTech')
    .setDescription('NestJS API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: 'API Documentation - VioTech',
    customCss: `
      .swagger-export-btn {
        position: absolute;
        top: 16px;
        right: 120px;
        z-index: 1000;
        background: #f5e6e6;
        color: #b30000;
        border: none;
        padding: 8px 18px;
        border-radius: 5px;
        font-weight: 500;
        font-size: 15px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        transition: background 0.2s;
      }
      .swagger-export-btn:hover {
        background: #ffeaea;
      }
      .swagger-ui .topbar { position: relative; }
    `,
    customfavIcon: '/favicon.ico',
    customJsStr: `
      setTimeout(() => {
        const topbar = document.querySelector('.swagger-ui .topbar');
        if (topbar && !document.querySelector('.swagger-export-btn')) {
          const btn = document.createElement('button');
          btn.innerText = 'Export OpenAPI JSON';
          btn.className = 'swagger-export-btn';
          btn.onclick = () => {
            fetch('/api-json')
              .then(res => res.json())
              .then(data => {
                const blob = new Blob([
                  JSON.stringify(data, null, 2)
                ], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'swagger-spec.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              });
          };
          topbar.appendChild(btn);
        }
      }, 800);
    `,
  });
  await app.listen(port);
}

void bootstrap();
