import { Module } from '@nestjs/common';
import { RobotaService } from './robota.service';
import { TopPageModule } from '../top-page/top-page.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [RobotaService],
  imports: [
    TopPageModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  exports: [RobotaService],
})
export class RobotaModule {}
