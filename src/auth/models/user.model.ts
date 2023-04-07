import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;
@Schema({ timestamps: true, id: true })
export class User {
  @Prop({ unique: true })
  email: string;
  @Prop()
  passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
