import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { ConfigServiceInterface } from './types';

(async function () {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigServiceInterface>(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  app.use(helmet());

  /** Swagger */
  SwaggerModule.setup(
    '/swagger',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Документация сервиса Bonus')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
        .build(),
    ),
  );

  await app.listen(port, () =>
    console.log(
      `Приложение запущено и доступно по ссылке http://localhost:${port}`,
    ),
  );
})();
