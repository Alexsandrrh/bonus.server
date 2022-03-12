import { ApiProperty } from '@nestjs/swagger';

import { User } from '../models';

export class UsersOkResponse {
  @ApiProperty({ type: [User] })
  response: User[];
}
