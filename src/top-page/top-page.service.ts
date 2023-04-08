import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TopPage, TopPageDocument } from './models/top-page.model';
import { Model, Types } from 'mongoose';
import { CreateTopPageDto, TopLevelCategory } from './dto/create.dto';
import { addDays } from 'date-fns';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPage.name) private topPageModule: Model<TopPageDocument>,
  ) {}
  async create(dtoIn: CreateTopPageDto): Promise<TopPageDocument> {
    return this.topPageModule.create(dtoIn);
  }
  async delete(id: string): Promise<TopPageDocument | null> {
    return this.topPageModule.findByIdAndDelete(id).exec();
  }
  async findById(id: string): Promise<TopPageDocument | null> {
    return this.topPageModule.findById(id).exec();
  }
  async findByAlias(alias: string): Promise<TopPageDocument | null> {
    return this.topPageModule.findOne({ alias }).exec();
  }
  async findByCategory(
    firstCategory: TopLevelCategory,
  ): Promise<TopPageDocument[] | null> {
    const _pipeline: Array<any> = [];
    _pipeline.push({
      $match: {
        firstCategory: firstCategory,
      },
    });
    _pipeline.push({
      $group: {
        _id: {
          secondCategory: '$secondCategory',
        },
        pages: {
          $push: {
            alias: '$alias',
            title: '$title',
          },
        },
      },
    });
    return this.topPageModule.aggregate(_pipeline).exec();
  }
  async findByText(text: string): Promise<TopPageDocument[] | null> {
    return this.topPageModule
      .find({ $text: { $search: text, $caseSensitive: false } })
      .exec();
  }
  async update(
    id: string,
    dtoIn: CreateTopPageDto,
  ): Promise<TopPageDocument | null> {
    return this.topPageModule
      .findByIdAndUpdate(id, dtoIn, { returnDocument: 'after' })
      .exec();
  }
  async findForRobotaUpdate(date: Date) {
    return this.topPageModule
      .find({
        firstCategory: 0,
        $or: [
          { 'robotaUa.updatedAt': { $lt: addDays(date, -1) } },
          { 'robotaUa.updatedAt': { $exists: false } },
        ],
      })
      .exec();
  }
}
