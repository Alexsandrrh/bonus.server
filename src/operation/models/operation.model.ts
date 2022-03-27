import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import {
  ModelOptions,
  Prop,
  Ref,
  Plugins,
  Severity,
} from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types, Schema } from 'mongoose';
import * as mongooseAutoPopulate from 'mongoose-autopopulate';

import { User, UserModelName } from '../../user/models';
import { PAYMENT_TYPE } from '../const';
import { UserSchema } from '../../user/schemes';
import { Product, ProductModelName } from '../../product/models';
import { ProductSchema } from '../../product/schemes';
export const OperationModelName = 'Operation';
export const OperationCollection = 'operations';

@ModelOptions({
  options: { customName: OperationModelName, allowMixed: Severity.ALLOW },
  schemaOptions: {
    collection: OperationCollection,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (
        doc,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        { _id, incomingAccountType, outgoingAccountType, ...ret },
      ) => ret,
    },
  },
})
@Plugins(mongooseAutoPopulate as any)
export class Operation extends TimeStamps {
  /**
   * Тип операции
   * */
  @ApiProperty({
    title: 'Тип операции',
    enum: PAYMENT_TYPE,
  })
  @Prop({
    type: String,
    enum: PAYMENT_TYPE,
    required: true,
  })
  paymentType: PAYMENT_TYPE;

  /**
   * Счет которому приходит сумма
   * */
  @ApiProperty({
    title: 'Счет которому приходит сумма',
    oneOf: [
      {
        $ref: `#/components/schemas/${UserSchema.name}`,
      },
      {
        $ref: `#/components/schemas/${ProductSchema.name}`,
      },
    ],
  })
  @Prop({
    type: Types.ObjectId,
    autopopulate: true,
    refPath: 'incomingAccountType',
    required: true,
  })
  incomingAccount: Ref<User | Product>;

  /**
   * Тип счета (Счет или товар), которому поступает сумма
   * */
  @Prop({
    type: String,
    enum: [UserModelName, ProductModelName],
    required: true,
  })
  incomingAccountType: typeof UserModelName | typeof ProductModelName;

  /**
   * Счет от которого взымается сумма
   * */
  @ApiProperty({
    title: 'Счет от которого взымается сумма',
    nullable: true,
    oneOf: [
      {
        $ref: `#/components/schemas/${UserSchema.name}`,
      },
    ],
  })
  @Prop({
    type: Types.ObjectId,
    autopopulate: true,
    refPath: 'outgoingAccountType',
    default: null,
  })
  outgoingAccount: Ref<User> | null;

  /**
   * Тип счета (Счет или товар), от которого поступает сумма
   * */
  @Prop({
    type: Schema.Types.Mixed,
    default: null,
  })
  outgoingAccountType: typeof UserModelName | null;

  /**
   * Сумма операции
   * */
  @ApiProperty({
    title: 'Сумма операции',
  })
  @Prop({ type: Number, default: 0 })
  paymentAmount: number;
}
