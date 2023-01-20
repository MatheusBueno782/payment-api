import { IsDateString, IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { minimumPositiveConstant } from '../../utils/utils.constants';

export class GetBestClientsQueryDto {
  @IsDateString()
  start: Date;

  @IsDateString()
  end: Date;

  @IsNumber()
  @IsOptional()
  @Min(minimumPositiveConstant)
  @Type(() => Number)
  limit: number;
}
