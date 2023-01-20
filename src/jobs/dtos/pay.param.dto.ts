import { IsNumberString } from 'class-validator';

export class PayParamDto {
  @IsNumberString()
  job_id: number;
}
