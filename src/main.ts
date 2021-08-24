import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as Express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
const server = Express();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(Express.json({ limit: '50mb' }));
  app.use(Express.urlencoded({ limit: '50mb', extended: true }));

  app.enableCors();

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
