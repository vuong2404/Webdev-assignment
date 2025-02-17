import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ScoresService } from '../scores/scores.service';
import { ScoresModule } from '../scores/scores.module';

@Module({
  controllers: [ReportsController],
  imports: [ScoresModule],
  providers: [ReportsService],
  exports: [ReportsService]
})
export class ReportsModule {}
