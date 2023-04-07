import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateDto, ListDto } from './dto/create.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/userEmail.decorator';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateDto) {
    return await this.reviewService.create(dto);
  }
  @UseGuards(JwtGuard)
  @Get('byProduct/:productId')
  async getByProduct(
    @Param('productId') productId: string,
    @UserEmail() email: string,
  ) {
    const review = await this.reviewService.findByProductId(productId);
    if (!review) {
      throw new HttpException('not exist', HttpStatus.NOT_FOUND);
    }
    return review;
  }
  @Get('list')
  async list(@Body() dtoIn: ListDto) {
    return await this.reviewService.list(dtoIn);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const review = await this.reviewService.delete(id);
    if (!review) {
      throw new HttpException('not exist', HttpStatus.NOT_FOUND);
    }
  }
}
