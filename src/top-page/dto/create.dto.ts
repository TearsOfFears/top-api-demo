import { Prop, Schema } from '@nestjs/mongoose';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}
export class HhData {
  @IsNumber()
  count: number;
  @IsNumber()
  juniorSalary: number;
  @IsNumber()
  middleSalary: number;
  @IsNumber()
  seniorSalary: number;
}
export class TopPageAdvantages {
  @IsString()
  title: string;
  @IsString()
  desc: string;
}
@Schema({ timestamps: true })
export class CreateTopPageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;
  @IsString()
  secondCategory: string;
  @IsString()
  title: string;
  @IsString()
  alias: string;
  @IsString()
  category: string;
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => HhData)
  hh?: HhData;
  @IsString()
  tagsTitle: string;
  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvantages)
  advantages: TopPageAdvantages[];
  @IsString()
  seoText: string;
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
