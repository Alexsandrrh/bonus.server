import { ApiProperty } from '@nestjs/swagger';

import { User } from '../models';

export class UserOkResponse {
  @ApiProperty()
  response: User;
}
