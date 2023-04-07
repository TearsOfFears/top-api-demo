import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

class ProductSettings {
  @Prop()
  name: string;
  @Prop()
  value: string;
}

@Schema({ timestamps: true })
export class Product {
  @Prop()
  image: string;
  @Prop()
  title: string;
  @Prop()
  price: number;
  @Prop()
  oldPrice: number;
  @Prop()
  credit: number;
  @Prop()
  desc: string;
  @Prop()
  advantage: string;
  @Prop()
  disAdvantages: string;
  @Prop([String])
  categories: string[];
  @Prop([String])
  tags: string[];
  @Prop([ProductSettings])
  characteristics: ProductSettings[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
