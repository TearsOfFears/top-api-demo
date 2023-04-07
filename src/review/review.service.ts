import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './models/review.model';
import { Model, SortOrder, Types } from 'mongoose';
import { CreateDto } from './dto/create.dto';
@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModule: Model<ReviewDocument>,
  ) {}
  async create(dtoIn: CreateDto): Promise<ReviewDocument> {
    dtoIn.productId = new Types.ObjectId(dtoIn.productId);
    return this.reviewModule.create(dtoIn);
  }
  async delete(id: string): Promise<ReviewDocument | null> {
    return this.reviewModule.findByIdAndDelete(id).exec();
  }
  async findByProductId(productId: string): Promise<ReviewDocument | null> {
    return this.reviewModule
      .findOne({ productId: new Types.ObjectId(productId) })
      .exec();
  }
  async list(dtoIn: {
    sortBy: SortOrder;
    key: string;
  }): Promise<ReviewDocument[] | null> {
    return this.reviewModule
      .find()
      .sort([[dtoIn.key, dtoIn.sortBy]])
      .exec();
  }
  async deleteByProductId(productId: string) {
    return this.reviewModule
      .deleteMany({ productId: new Types.ObjectId(productId) })
      .exec();
  }
}
