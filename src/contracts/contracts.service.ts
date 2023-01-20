import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ContractsModel } from './models/contracts.model';
import { InjectModel } from '@nestjs/sequelize';
import { ProfilesModel } from '../profiles/models/profiles.model';
import { Op } from 'sequelize';
import { Maybe } from '../utils/utils.types';
import { IsNotNullishValidator } from '../utils/validators/is-not-nulish.validator';

@Injectable()
export class ContractsService {
  constructor(
    @InjectModel(ContractsModel) private contractsModel: typeof ContractsModel,
  ) {}

  async findById(
    contractId: number,
    profile: ProfilesModel,
  ): Promise<ContractsModel> {
    // I suppose the contract belongs to client and contractor
    const contract: Maybe<ContractsModel> = await this.contractsModel.findOne({
      where: {
        id: contractId,
        [Op.or]: [{ ClientId: profile.id }, { ContractorId: profile.id }],
      },
    });

    if (!IsNotNullishValidator.check<ContractsModel>(contract)) {
      throw new HttpException(
        'No contract belongs to the user',
        HttpStatus.NOT_FOUND,
      );
    }

    return contract;
  }

  async findAll(profile: ProfilesModel): Promise<Array<ContractsModel>> {
    return this.contractsModel.findAll({
      where: {
        status: { [Op.ne]: 'terminated' },
        [Op.or]: [{ ClientId: profile.id }, { ContractorId: profile.id }],
      },
    });
  }
}
