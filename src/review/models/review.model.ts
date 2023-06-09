import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReviewDocument = Review & Document;
@Schema({ timestamps: true })
export class Review {
  @Prop()
  name: string;
  @Prop()
  title: string;
  @Prop()
  desc: string;
  @Prop()
  rating: number;
  @Prop()
  productId: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
