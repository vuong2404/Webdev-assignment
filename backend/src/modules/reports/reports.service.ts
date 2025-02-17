import { Injectable } from '@nestjs/common';
import { ScoresService } from '../scores/scores.service';

@Injectable()
export class ReportsService {
  constructor(private readonly scoresService: ScoresService) {}

  async getReports(subject: string): Promise<any> {
      const distribution = await this.scoresService.getSubjectReports(subject)
      const top10 = await this.scoresService.getTop10Scores(subject)

      return {
        distribution, top10
      }

  }
}
