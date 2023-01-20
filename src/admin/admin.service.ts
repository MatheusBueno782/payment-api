import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JobsModel } from '../jobs/models/jobs.model';
import { Op } from 'sequelize';
import { ContractsModel } from '../contracts/models/contracts.model';
import { ProfilesModel } from '../profiles/models/profiles.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(JobsModel) private jobsModel: typeof JobsModel,
    private sequelize: Sequelize,
  ) {}

  async getBestProfession(startDate: Date, endDate: Date): Promise<JobsModel> {
    const jobsList: Array<JobsModel> = await this.jobsModel.findAll({
      attributes: [
        [this.sequelize.fn('sum', this.sequelize.col('price')), 'totalEarns'],
      ],

      order: [['totalEarns', 'DESC']],
      group: ['Contract.Contractor.profession'],
      where: {
        paymentDate: { [Op.between]: [startDate, endDate] },
      },
      include: [
        {
          model: ContractsModel,
          attributes: ['ContractorId'],
          required: true,

          include: [
            {
              model: ProfilesModel,
              foreignKey: 'ContractorId',
              as: 'Contractor',
              required: true,
              attributes: ['profession', 'id'],
            },
          ],
        },
      ],
    });

    return jobsList[0];
  }

  async getBestClients(startDate: Date, endDate: Date, limit = 2) {
    const jobsList: Array<JobsModel> = await this.jobsModel.findAll({
      attributes: [
        [this.sequelize.fn('sum', this.sequelize.col('price')), 'totalPaid'],
      ],
      order: [['totalPaid', 'DESC']],
      limit: limit,
      group: ['Contract.Client.firstName', 'Contract.Client.lastName'],
      where: {
        paymentDate: { [Op.between]: [startDate, endDate] },
      },
      include: [
        {
          model: ContractsModel,
          attributes: ['ClientId'],
          required: true,
          include: [
            {
              model: ProfilesModel,
              as: 'Client',
              required: true,
              attributes: ['firstName', 'lastName', 'id'],
            },
          ],
        },
      ],
    });

    // should be a better approach than this
    return jobsList.map((job: any) => {
      return {
        id: job.contract.Client.id,
        fullName: `${job.contract.Client.firstName} ${job.contract.Client.lastName}`,
        paid: job.dataValues.totalPaid,
      };
    });
  }
}
