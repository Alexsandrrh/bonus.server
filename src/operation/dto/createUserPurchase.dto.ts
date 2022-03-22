import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateUserPurchaseDto {
  /**
   * Идентификатор продукта
   * */
  @ApiProperty({
    title: 'Идентификатор продукта',
    example: new Types.ObjectId(),
  })
  productId: string;
}
