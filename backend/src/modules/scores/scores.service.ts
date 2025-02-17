import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SCORES_REPOSITORY } from 'src/core/constants';
import { Scores } from './scores.model';
import { col, fn, literal, Op, Sequelize } from 'sequelize';

@Injectable()
export class ScoresService {
  constructor(
    @Inject(SCORES_REPOSITORY) private readonly scoresRepository: typeof Scores,
  ) {}

  async getScores(sbd: string): Promise<Scores> {
    let result = await this.scoresRepository.findOne({ where: { sbd } });

    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  async getSubjectReports(subject: string): Promise<any> {
    const intervals = [
      { label: '0-4', condition: `${subject} BETWEEN 0 AND 4` },
      { label: '4-6', condition: `${subject} > 4 AND ${subject} <= 6` },
      { label: '6-8', condition: `${subject} > 6 AND ${subject} <= 8` },
      { label: '8-10', condition: `${subject} > 8 AND ${subject} <= 10` },
    ];

    const attributes: any[] = [
      [fn('COUNT', col(subject)), 'total'],
      [fn('AVG', col(subject)), 'average'],
    ];

    for (const interval of intervals) {
      attributes.push([
        fn('SUM', literal(`CASE WHEN ${interval.condition} THEN 1 ELSE 0 END`)),
        interval.label,
      ]);
    }

    const distribution = await this.scoresRepository.findOne({
      attributes,
      raw: true,
    });

    return distribution;
  }

  async getTop10Scores(subject: string): Promise<any[]> {
    const top10 = await this.scoresRepository.findAll({
      attributes: ['sbd', [subject, "score"]],
      where: {
        [subject]: { [Op.ne]: null } 
      },
      order: [[subject, 'DESC']],
      limit: 10,
      raw: true,
    });
    return top10;
  }
}
