import { Module } from '@nestjs/common';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';
import { scoresProvider } from './scores.providers';

@Module({
  controllers: [ScoresController],
  providers: [ScoresService, ...scoresProvider],
  exports: [ScoresService]
})
export class ScoresModule {}
