import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { PayParamDto } from './dtos/pay.param.dto';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get('/unpaid')
  async getMany(@Req() req: any) {
    return this.jobsService.getAllUnpaid(req.profile);
  }

  @Post('/:job_id/pay')
  async pay(@Req() req: any, @Param() param: PayParamDto) {
    return this.jobsService.pay(req.profile, param.job_id);
  }
}
