import { Operation } from '../models';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class OperationSchema extends Operation {
  /**
   * Идентификатор операции
   * */
  @ApiProperty({
    title: 'Идентификатор операции',
    example: new Types.ObjectId(),
  })
  id: string;

  /**
   * Дата создания операции
   * */
  @ApiProperty({
    title: 'Дата создания операции',
  })
  createdAt: Date;

  /**
   * Дата изменения операции
   * */
  @ApiProperty({ title: 'Дата изменения операции' })
  updatedAt: Date;
}

export type OperationSchemaType = OperationSchema | Operation;
