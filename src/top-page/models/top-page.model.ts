import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type TopPageDocument = TopPage & Document;

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}
export class RobotaData {
  @Prop()
  count: number;
  @Prop()
  juniorSalary: number;
  @Prop()
  middleSalary: number;
  @Prop()
  seniorSalary: number;
  @Prop()
  updatedAt: Date;
}
export class TopPageAdvantages {
  @Prop()
  title: string;
  @Prop()
  desc: string;
}
@Schema({ timestamps: true })
export class TopPage {
  @Prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;
  @Prop()
  secondCategory: string;
  @Prop()
  title: string;
  @Prop({ unique: true })
  alias: string;
  @Prop()
  category: string;
  @Prop(RobotaData)
  robotaUa?: RobotaData;
  @Prop()
  tagsTitle: string;
  @Prop([TopPageAdvantages])
  advantages: TopPageAdvantages[];
  seoText: string;
  @Prop([String])
  tags: string[];
}
const TopPageSchema = SchemaFactory.createForClass(TopPage);
TopPageSchema.index({ title: 'text', seoText: 'text', advantages: 'text' });
export { TopPageSchema };
