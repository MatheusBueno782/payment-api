import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProfilesModel } from '../models/profiles.model';
import { Maybe } from '../../utils/utils.types';
import { IsNotNullishValidator } from '../../utils/validators/is-not-nulish.validator';

@Injectable()
export class ProfileGuard implements CanActivate {
  //I should use a service here instead of directly using the model
  constructor(
    @InjectModel(ProfilesModel) private profilesModel: typeof ProfilesModel,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const profileId: Maybe<number> = request.headers['profile_id'];

    if (!IsNotNullishValidator.check<number>(profileId)) {
      throw new HttpException(
        'profile_id not in the headers',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const profile: Maybe<ProfilesModel> = await this.profilesModel.findOne({
      where: { id: profileId },
    });

    if (!IsNotNullishValidator.check<ProfilesModel>(profile)) {
      throw new HttpException('profile_id not found', HttpStatus.UNAUTHORIZED);
    }
    request['profile'] = profile;
    return true;
  }
}
