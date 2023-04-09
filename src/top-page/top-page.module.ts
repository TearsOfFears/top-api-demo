import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { TopPageService } from './top-page.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPage, TopPageSchema } from './models/top-page.model';
import { RobotaModule } from '../robota/robota.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TopPage.name, schema: TopPageSchema }]),
    RobotaModule,
  ],
  controllers: [TopPageController],
  providers: [TopPageService],
  exports: [TopPageService],
})
export class TopPageModule {}
