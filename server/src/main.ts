import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.API_PREFIX, {
    exclude: ['/'],
  });
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  //cors configuration
  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], //Allows cross-origin requests from your frontend (likely running on port 5173, e.g., Vite).
    credentials: true,
    origin: process.env.REACT_APP_URL || 'http://localhost:5173',
  });
  await app.listen(configService.get('app.port'), () => {
    console.log(`Server running at port: ${configService.get('app.port')}`);
  });
}
bootstrap();
