import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { ReviewService } from './review.service';

describe('ReviewService', () => {
  let service: ReviewService;

  const exec = { exec: jest.fn() };
  const reviewRepositoryFactory = () => ({
    findOne: () => exec,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          useFactory: reviewRepositoryFactory,
          provide: getModelToken('Review'),
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByProductId working', async () => {
    const id = new Types.ObjectId().toHexString();
    reviewRepositoryFactory()
      .findOne()
      .exec.mockReturnValueOnce([{ productId: id }]);
    const res = await service.findByProductId(id);
    expect(res[0].productId).toBe(id);
  });
});
