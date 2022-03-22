import { ConfigService } from '@nestjs/config';

import { ConfigInterface } from './config.interface';

export interface ConfigServiceInterface
  extends ConfigService<ConfigInterface> {}
