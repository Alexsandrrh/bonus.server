import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ModelOptions, Prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { User, UserModelName } from '../../user/models';
import { PAYMENT_TYPE } from '../consts';
import { UserSchema } from '../../user/schemes';
import { Product, ProductModelName } from '../../product/models';
import { ProductSchema } from '../../product/schemes';

export const OperationModelName = 'Operation';
export const OperationCollection = 'operations';

const AccountTypeEnum = [UserModelName, ProductModelName];
const AccountTypeOneOf = [UserSchema.name, ProductSchema.name].map((name) => ({
  $ref: `#/components/schemas/${name}`,
}));
type AccountTypeRef = Ref<User | Product>;

@ModelOptions({
  options: { customName: OperationModelName },
  schemaOptions: {
    collection: OperationCollection,
  },
})
export class Operation extends TimeStamps {
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
    nullable: true,
    oneOf: AccountTypeOneOf,
  })
  @Prop({
    type: Types.ObjectId,
    refPath: 'incomingAccountType',
  })
  incomingAccount: AccountTypeRef;

  /** Тип счета (Счет или товар), которому поступает сумма */
  @ApiProperty({
    type: String,
    description: 'Тип счета (Счет или товар)',
    enum: AccountTypeEnum,
  })
  @Prop()
  incomingAccountType: string;

  /** Счет от которого взымается сумма */
  @ApiProperty({
    description: 'Счет от которого взымается сумма',
    nullable: true,
    oneOf: AccountTypeOneOf,
  })
  @Prop({ type: Types.ObjectId, refPath: 'outgoingAccountType' })
  outgoingAccount: AccountTypeRef;

  /** Тип счета (Счет или товар), от которого поступает сумма */
  @ApiProperty({
    description: 'Тип счета (Счет или товар), от которого поступает сумма',
    enum: AccountTypeEnum,
  })
  @Prop()
  outgoingAccountType: string;

  /** Сумма */
  @ApiProperty({
    description: 'Сумма',
  })
  @Prop({ type: Number, default: 0 })
  paymentAmount: number;
}
