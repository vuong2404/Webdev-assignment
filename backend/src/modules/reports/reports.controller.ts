import { Controller, Get, Request } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatusCode } from 'src/global/globalEnum';

@Controller('reports')
export class ReportsController {
  constructor(private reportSevice: ReportsService) {}
  @Get('/:subject')
  async getDistribution(@Request() req) {
    try {
      const data = await this.reportSevice.getReports(req.params['subject']);
      return new ResponseData(data, HttpStatusCode.SUCCESS, '');
    } catch (error) {
        return new ResponseData(null, HttpStatusCode.INTERNAL_ERROR, HttpMessage.INTERNAL_ERROR)
    }
  }
}
