import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@typegoose/typegoose';

export class Product extends TimeStamps {
  /** Название товара */
  @ApiProperty({
    description: 'Название товара',
  })
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  /** Описание товара */
  @ApiProperty({
    description: 'Описание товара',
  })
  @Prop({
    type: String,
    required: true,
  })
  description: string;

  /** Цена товара */
  @ApiProperty({
    description: 'Цена товара',
  })
  @Prop({ type: Number, required: true })
  price: number;
}
