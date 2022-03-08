import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { ConfigServiceInterface } from './types';

(async function () {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigServiceInterface>(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  app.use(helmet());

  await app.listen(port, () =>
    console.log(
      `Приложение запущено и доступно по ссылке http://localhost:${port}`,
    ),
  );
})();
