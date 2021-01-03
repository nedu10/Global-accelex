import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { Connection } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Global Accelex Test')
    .setDescription('The Global Accelex Test API description')
    .setVersion('1.0')
    .addTag('GAT')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  const connection = app.get(Connection);
    connection.runMigrations();

  SwaggerModule.setup('api', app, document);
  app.enableCors();

  await app.listen(3000, () => {
    Logger.log(`Listening on port ${3000}`);
  });
}
bootstrap();
