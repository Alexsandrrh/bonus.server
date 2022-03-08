import { ApiProperty } from '@nestjs/swagger';

import { Auth } from '../auth.model';

export class AuthOkResponse {
  @ApiProperty()
  response: Auth;
}
