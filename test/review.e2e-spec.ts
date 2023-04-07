import { Test, TestingModule } from '@nestjs/testing';
import { Body, HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateDto } from '../src/review/dto/create.dto';
import { Types, disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';
// import { REVIEW_NOT_FOUND } from '../src/review/review.constants';

const productId = new Types.ObjectId();
const loginDto: AuthDto = {
  email: 'test@gmail.com',
  password: 'test12345',
};
const testDto: CreateDto = {
  name: 'Тест',
  title: 'Заголовок',
  desc: 'Описание тестовое',
  rating: 5,
  productId,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto);
    token = body.access_token;
  });
  afterAll(() => {
    disconnect();
  });
  it('/review/create (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
      });
  });
  it('/review/create (POST) - fail', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send({ ...testDto, rating: '5' })
      .expect(400);
  });
  it('/review/byProduct/:productId (GET) - success', async () => {
    return request(app.getHttpServer())
      .get('/review/byProduct/' + productId)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body).toBeDefined();
      });
  });

  it('/review/byProduct/:productId (GET) - fail', async () => {
    return request(app.getHttpServer())
      .get('/review/byProduct/' + new Types.ObjectId().toHexString())
      .set('Authorization', 'Bearer ' + token)
      .expect(HttpStatus.NOT_FOUND, {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'not exist',
      });
  });

  it('/review/:id (DELETE) - success', () => {
    return request(app.getHttpServer())
      .delete('/review/' + createdId)
      .expect(200);
  });

  it('/review/:id (DELETE) - fail', () => {
    return request(app.getHttpServer())
      .delete('/review/' + new Types.ObjectId().toHexString())
      .expect(HttpStatus.NOT_FOUND, {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'not exist',
      });
  });
});
