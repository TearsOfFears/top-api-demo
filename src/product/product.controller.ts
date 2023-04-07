import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Product } from './models/product.model';
import { FindProductDto } from './dto/find-product.dto';
import { CreateDto } from './dto/create.dto';
import { ProductService } from './product.service';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('create')
  async create(@Body() dto: CreateDto) {
    return this.productService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const product = await this.productService.findById(id);
    if (!product) {
      throw new NotFoundException('Not found');
    }
    return await this.productService.delete(id);
  }

  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dtoIn: Product,
  ) {
    const product = await this.productService.findById(id);
    if (!product) {
      throw new NotFoundException('Not found');
    }
    return await this.productService.update(id, dtoIn);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('list')
  async list(@Body() dtoIn: FindProductDto) {
    return this.productService.findWithReviews(dtoIn);
  }
  @Get(':id')
  async getById(@Param('id', IdValidationPipe) id: string) {
    const product = await this.productService.findById(id);
    if (!product) {
      throw new NotFoundException('Not found');
    }
    return product;
  }
}
