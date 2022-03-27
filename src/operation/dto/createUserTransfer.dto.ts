import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateUserTransferDto {
  /**
   * Сумма перевода
   * */
  @ApiProperty({ title: 'Сумма перевода', example: 10, minimum: 10 })
  @IsNotEmpty()
  @IsNumber()
  @Min(10)
  paymentAmount: number;

  /**
   * Идентификатор счета (Кому переводится сумма)
   * */
  @ApiProperty({
    title: 'Идентификатор счета (Кому переводится сумма)',
    example: new Types.ObjectId(),
  })
  @IsNotEmpty()
  @IsString()
  incomingAccount: string;
}
