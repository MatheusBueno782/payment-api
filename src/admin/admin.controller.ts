import { Controller, Get, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { GetBestProfessionQueryDto } from './dtos/get-best-profession.query.dto';
import { GetBestClientsQueryDto } from './dtos/get-best-clients.query.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('best-profession')
  async getBestProfession(@Query() query: GetBestProfessionQueryDto) {
    return this.adminService.getBestProfession(query.start, query.end);
  }

  @Get('best-clients')
  async getBestClients(@Query() query: GetBestClientsQueryDto) {
    return this.adminService.getBestClients(
      query.start,
      query.end,
      query.limit,
    );
  }
}
