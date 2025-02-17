import { Controller, Get, Request, Param, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ResponseData } from 'src/global/globalClass';

@Controller('scores')
export class ScoresController {
    constructor(private scoresService: ScoresService) {}

    @Get('/:sbd')
    async getDetailsScore(@Param('sbd') sbd: string) {
        try {
            const result = await this.scoresService.getScores(sbd);
            
            if (!result) {
                throw new NotFoundException(new ResponseData(null, 404, "Student not found"));
            }

            return new ResponseData(result, 200, "Success");
        } catch (error) {
            console.error("Error fetching score:", error);

            if (error instanceof NotFoundException) {
                throw error;
            }

            throw new InternalServerErrorException(new ResponseData(null, 500, "Internal server error"));
        }
    }
}
