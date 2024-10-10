import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.intercepor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes( 
    new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true,
  }),); 
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
