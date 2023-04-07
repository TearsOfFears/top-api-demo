import { Test, TestingModule } from '@nestjs/testing';
import { Body, HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateDto } from '../src/review/dto/create.dto';
import { Types, disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoConfig } from '../src/configs/mongo.config';
import { AuthService } from '../src/auth/auth.service';
// import { REVIEW_NOT_FOUND } from '../src/review/review.constants';

const productId = new Types.ObjectId();

const loginDto: AuthDto = {
  email: 'test@gmail.com',
  password: 'test12345',
};

describe('user e2e', () => {
  let app: INestApplication;
  let createdId: string;
  let authService: AuthService;
  // let token: string;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(() => {
    disconnect();
  });
  it('/auth/login (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.access_token).toBeDefined();
      });
  });
  it('/auth/login (POST) - fail', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: 'tesff' })
      .expect(HttpStatus.UNAUTHORIZED, {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'something wrong with credential tha you pass',
        error: 'Unauthorized',
      });
  });
});
