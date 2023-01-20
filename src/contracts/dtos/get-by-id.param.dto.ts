import { IsNumberString } from 'class-validator';

export class GetByIdParamDto {
  @IsNumberString()
  id: number;
}
