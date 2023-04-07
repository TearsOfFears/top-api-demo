import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { CreateTopPageDto } from './dto/create.dto';
import { TopPageService } from './top-page.service';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { TopPageDocument } from './models/top-page.model';

@Controller('topPage')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(
    @Body() dtoIn: CreateTopPageDto,
  ): Promise<TopPageDocument | null> {
    let topPage;
    try {
      topPage = await this.topPageService.create(dtoIn);
    } catch (e: any) {
      throw new HttpException(
        {
          message: 'Somethnif wrong with db',
          code: e.message,
        },
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    return topPage;
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('findByCategory')
  async find(@Body() dtoIn: FindTopPageDto): Promise<TopPageDocument[]> {
    return this.topPageService.findByCategory(dtoIn.firstCategory);
  }
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id): Promise<TopPageDocument> {
    const topPage = await this.topPageService.findById(id);
    if (!topPage) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return topPage;
  }

  @Delete(':id')
  async delete(
    @Param('id', IdValidationPipe) id: string,
  ): Promise<TopPageDocument> {
    const topPage = await this.topPageService.findById(id);
    if (!topPage) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.topPageService.delete(id);
  }

  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dtoIn: CreateTopPageDto,
  ): Promise<TopPageDocument> {
    const topPage = await this.topPageService.findById(id);
    if (!topPage) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.topPageService.update(id, dtoIn);
  }
  @Get('getByAlias/:alias')
  async getByAlias(@Param('alias') alias: string): Promise<TopPageDocument> {
    return this.topPageService.findByAlias(alias);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('textSearch/:text')
  async textSearch(@Param('text') text): Promise<TopPageDocument[]> {
    return this.topPageService.findByText(text);
  }
}
