import { SCORES_REPOSITORY, USER_REPOSITORY } from '../../core/constants';
import { Scores } from './scores.model';

export const scoresProvider = [{
    provide: SCORES_REPOSITORY,
    useValue: Scores,
}];