import { Controller, Get, Param, Req } from '@nestjs/common';
import { GetByIdParamDto } from './dtos/get-by-id.param.dto';
import { ContractsService } from './contracts.service';

@Controller('contracts')
export class ContractsController {
  constructor(private contractsService: ContractsService) {}
  @Get('/:id')
  async getById(@Param() param: GetByIdParamDto, @Req() req: any) {
    return this.contractsService.findById(param.id, req.profile);
  }

  @Get()
  async getMany(@Req() req: any) {
    return this.contractsService.findAll(req.profile);
  }
}
