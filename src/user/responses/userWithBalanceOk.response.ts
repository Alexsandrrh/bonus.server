import { ApiProperty } from '@nestjs/swagger';

import { UserWithBalanceSchema, UserWithBalanceSchemaType } from '../schemes';

export class UserWithBalanceOkResponse {
  @ApiProperty({ type: UserWithBalanceSchema })
  response: UserWithBalanceSchemaType;
}
