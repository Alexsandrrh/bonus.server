import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateUserTransferDto {
  /**
   * Сумма перевода
   * */
  @ApiProperty({ title: 'Сумма перевода', example: 100 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
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
