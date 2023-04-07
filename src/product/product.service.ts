import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './models/product.model';
import { Model, SortOrder, Types } from 'mongoose';
import { CreateDto } from './dto/create.dto';
import { FindProductDto } from './dto/find-product.dto';
import { Review } from '../review/models/review.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModule: Model<ProductDocument>,
  ) {}
  async create(dtoIn: CreateDto): Promise<ProductDocument> {
    return this.productModule.create(dtoIn);
  }
  async delete(id: string): Promise<ProductDocument | null> {
    return this.productModule.findByIdAndDelete(id).exec();
  }
  async findById(id: string): Promise<ProductDocument | null> {
    return this.productModule.findById(id).exec();
  }
  async findByProductId(productId: string): Promise<ProductDocument | null> {
    return this.productModule
      .findOne({ productId: new Types.ObjectId(productId) })
      .exec();
  }
  async update(id: string, dtoIn: CreateDto): Promise<ProductDocument | null> {
    return this.productModule
      .findByIdAndUpdate(id, dtoIn, { returnDocument: 'after' })
      .exec();
  }
  async findWithReviews(dtoIn: FindProductDto) {
    const _pipeline: Array<any> = [];
    _pipeline.push({
      $match: {
        categories: dtoIn.category,
      },
    });
    _pipeline.push({
      $sort: {
        _id: 1,
      },
    });
    _pipeline.push({
      $limit: dtoIn.limit,
    });
    _pipeline.push({
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'productId',
        as: 'reviews',
      },
    });
    _pipeline.push({
      $addFields: {
        reviewCount: { $size: '$reviews' },
        reviewAvg: { $avg: '$reviews.rating' },
        reviews: {
          $function: {
            body: `function (reviews) {
              reviews.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
              );
              return reviews;
            }`,
            args: ['$reviews'],
            lang: 'js',
          },
        },
      },
    });
    return this.productModule.aggregate(_pipeline).exec();
    // as (Product & {
    //   reviews: Review[];
    //   reviewCount: number;
    //   reviewAvg: number;
    // })[];
  }
}
