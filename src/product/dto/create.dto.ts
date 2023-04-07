import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProductCharacteristicsDto {
  @IsString()
  name: string;
  @IsString()
  value: string;
}

export class CreateDto {
  @IsString()
  image: string;
  @IsString()
  title: string;
  @IsOptional()
  @IsNumber()
  price: number;
  @IsNumber()
  oldPrice?: number;
  @IsNumber()
  credit: number;
  @IsString()
  desc: string;
  @IsString()
  advantage: string;
  @IsString()
  disAdvantages: string;
  @IsString({ each: true }) //every element is string
  categories: string[];
  @IsString({ each: true })
  tags: string[];
  @IsArray()
  @ValidateNested()
  @Type(() => ProductCharacteristicsDto)
  characteristics: ProductCharacteristicsDto[];
}
