import { ApiProperty } from '@nestjs/swagger';
import { Operation } from '../models';

export class OperationsOkResponse {
  @ApiProperty({ type: [Operation] })
  response: Operation[];
}
