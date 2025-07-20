import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from '@common/filters/all-exceptions.filter';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.disable('x-powered-by');
  app.disable('etag');

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(cookieParser());
  app.setGlobalPrefix('api', { exclude: ['auth/(.*)', 'health'] });
  app.enableCors({ origin: process.env.ALLOWED_ORIGINS?.split(',') });

  const config = new DocumentBuilder()
    .setTitle('Customer Management API')
    .setDescription('Customer Management API description')
    .setVersion('0.1')
    .addBearerAuth()
    .addCookieAuth('jwt')
    .build();
  const swaggerOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Customer Management API Swagger',
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, swaggerOptions);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
