import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { User } from '../../user/models';
import { Product } from '../../product/models';

/** Типы операций */
enum PAYMENT_TYPE {
  /** Перевод */
  transfer,
  /** Покупка */
  purchase,
}

type RefTypes = Ref<User | Product>;
const TypesOneOf = [
  {
    $ref: '#/components/schemas/User',
  },
  {
    $ref: '#/components/schemas/Product',
  },
];

const enumTypes = [User.name, Product.name];

export class Operation extends TimeStamps {
  /** Идентификатор операции */
  @ApiProperty({
    format: 'uuid',
    description: 'Идентификатор операции',
  })
  id: string;

  /** Тип операции */
  @ApiProperty({
    description: 'Тип операции',
    enum: PAYMENT_TYPE,
  })
  @Prop()
  paymentType: PAYMENT_TYPE;

  /** Счет которому приходит сумма */
  @ApiProperty({
    description: 'Счет которому приходит сумма',
    oneOf: TypesOneOf,
  })
  @Prop({
    type: Types.ObjectId,
    refPath: 'incomingAccountType',
  })
  incomingAccount: RefTypes;

  /** Тип счета (Счет или товар), которому поступает сумма */
  @ApiProperty({
    type: String,
    description: 'Тип счета (Счет или товар)',
    enum: enumTypes,
  })
  @Prop()
  incomingAccountType: string;

  /** Счет от которого взымается сумма */
  @ApiProperty({
    description: 'Счет от которого взымается сумма',
    oneOf: TypesOneOf,
  })
  @Prop({ type: Types.ObjectId, refPath: 'outcomingAccountType' })
  outcomingAccount: RefTypes;

  /** Тип счета (Счет или товар), от которого поступает сумма */
  @ApiProperty({
    description: 'Тип счета (Счет или товар), от которого поступает сумма',
    enum: enumTypes,
  })
  @Prop()
  outcomingAccountType: string;

  /** Сумма */
  @ApiProperty({
    description: 'Сумма',
  })
  @Prop({ type: Number, default: 0 })
  paymentAmount: number;

  /** Дата создания операции */
  @ApiProperty({
    type: Date,
    description: 'Дата создания операции',
  })
  createdAt: Date;

  /** Дата изменения операции */
  @ApiProperty({ type: Date, description: 'Дата изменения операции' })
  updatedAt: Date;
}
