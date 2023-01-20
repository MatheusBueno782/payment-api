import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JobsModel } from './models/jobs.model';
import { InjectModel } from '@nestjs/sequelize';
import { ProfilesModel } from '../profiles/models/profiles.model';
import { ContractsModel } from '../contracts/models/contracts.model';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Maybe } from '../utils/utils.types';
import { IsNotNullishValidator } from '../utils/validators/is-not-nulish.validator';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(JobsModel) private jobsModel: typeof JobsModel,
    private sequelize: Sequelize,
  ) {}

  getAllUnpaid(profile: ProfilesModel): Promise<Array<JobsModel>> {
    return this.jobsModel.findAll({
      where: { paid: null },
      include: {
        model: ContractsModel,
        required: true,
        where: {
          status: 'in_progress',
          [Op.or]: [{ ClientId: profile.id }, { ContractorId: profile.id }],
        },
      },
    });
  }

  /**
   * businessRules:
   * - I must be the contract's client in order to pay
   * - I can only pay if his balance >= the amount to pay
   * - I can't pay jobs that are already paid
   * - The amount should be moved from my balance to the contractor balance
   * Note: these operations should be atomic, using transaction
   **/
  async pay(profile: ProfilesModel, jobId: number): Promise<JobsModel> {
    const updatedJob: JobsModel = await this.sequelize.transaction(
      async (t) => {
        const job: Maybe<JobsModel> = await this.jobsModel.findOne({
          where: { id: jobId, paid: null },
          include: [
            {
              model: ContractsModel,
              required: true,
              where: {
                ClientId: profile.id,
              },
              include: [
                {
                  model: ProfilesModel,
                  as: 'Client',
                  required: true,
                  where: {
                    balance: { [Op.gte]: this.sequelize.col('price') },
                  },
                },
              ],
            },
          ],
          transaction: t,
        });

        if (!IsNotNullishValidator.check<JobsModel>(job)) {
          throw new HttpException(
            `Could no complete the operation, 
          please certify that you have sufficient founds or if the job is already paid`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        await job.update(
          { paid: 1, paymentDate: Date.now() },
          { transaction: t },
        );

        const { ClientId, ContractorId } = job.contract;

        await ProfilesModel.decrement(
          { balance: job.price },
          { where: { id: ClientId }, transaction: t },
        );

        await ProfilesModel.increment(
          { balance: job.price },
          { where: { id: ContractorId }, transaction: t },
        );

        return job;
      },
    );
    await updatedJob.reload({
      include: [
        {
          model: ContractsModel,
          include: [{ model: ProfilesModel, as: 'Client' }],
        },
      ],
    });

    return updatedJob;
  }
}
