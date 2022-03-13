import { ApiProperty } from '@nestjs/swagger';

import { OperationSchema, OperationSchemaType } from '../schemes';

export class OperationsOkResponse {
  @ApiProperty({ type: [OperationSchema] })
  response: OperationSchemaType[];
}
