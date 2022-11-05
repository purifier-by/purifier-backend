import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser());


  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .build();

  const options = {
    swaggerOptions: {
      authAction: {
        defaultBearerAuth: {
          name: 'defaultBearerAuth',
          schema: {
            description: 'Default',
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          value: 'thisIsASampleBearerAuthToken123',
        },
      },
    },
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, options);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
