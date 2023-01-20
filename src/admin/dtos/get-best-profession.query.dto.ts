import { IsDateString } from 'class-validator';

export class GetBestProfessionQueryDto {
  @IsDateString()
  start: Date;

  @IsDateString()
  end: Date;
}
