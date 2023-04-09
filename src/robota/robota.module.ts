import { Module } from '@nestjs/common';
import { RobotaService } from './robota.service';
// import { TopPageModule } from '../top-page/top-page.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [RobotaService],
  imports: [HttpModule.register({})],
  exports: [RobotaService],
})
export class RobotaModule {}
