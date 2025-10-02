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
  await app.listen(configService.get('app.port'), () => {
    console.log(`Server running at port: ${configService.get('app.port')}`);
  });
}
bootstrap();
