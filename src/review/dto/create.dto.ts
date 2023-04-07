import { SortOrder, Types } from 'mongoose';
import { IsString, IsNumber, Max, Min } from 'class-validator';
export class CreateDto {
  @IsString()
  name: string;
  @IsString()
  title: string;
  @IsString()
  desc: string;
  @Max(5, { message: 'rating higher then 5' })
  @Min(1, { message: 'rating less 1' })
  @IsNumber()
  rating: number;
  @IsString()
  productId: Types.ObjectId | string;
}

export class ListDto {
  @IsString()
  sortBy: SortOrder;
  @IsString()
  key: string;
}
