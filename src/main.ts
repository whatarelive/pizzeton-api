import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Creación del punto de inicio de la aplicación
  const app = await NestFactory.create(AppModule);

  // Prefijo inicial a la url del servicio
  app.setGlobalPrefix('api');

  // Habilitación para que solo se puedan hacer peticiones desde un
  // origen determinado
  app.enableCors({
    origin: '*',
  });

  // Configuración global de validación de param y props de las requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Se inicia la aplicación el puerto disponible
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
