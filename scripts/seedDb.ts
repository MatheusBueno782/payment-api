import { ProfilesModel } from '../src/profiles';
import { ContractsModel } from '../src/contracts';
import { JobsModel } from '../src/jobs';
import { Sequelize } from 'sequelize-typescript';

seedDb();

async function seedDb() {
  const sequelize: Sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite3',
  });

  sequelize.addModels([ProfilesModel, ContractsModel, JobsModel]);

  await ProfilesModel.sync({ force: true });
  await ContractsModel.sync({ force: true });
  await JobsModel.sync({ force: true });

  await Promise.all([
    ProfilesModel.create({
      id: 1,
      firstName: 'Harry',
      lastName: 'Potter',
      profession: 'Wizard',
      balance: 1150,
      type: 'client',
    }),
    ProfilesModel.create({
      id: 2,
      firstName: 'Mr',
      lastName: 'Robot',
      profession: 'Hacker',
      balance: 231.11,
      type: 'client',
    }),
    ProfilesModel.create({
      id: 3,
      firstName: 'John',
      lastName: 'Snow',
      profession: 'Knows nothing',
      balance: 451.3,
      type: 'client',
    }),
    ProfilesModel.create({
      id: 4,
      firstName: 'Ash',
      lastName: 'Kethcum',
      profession: 'Pokemon master',
      balance: 1.3,
      type: 'client',
    }),
    ProfilesModel.create({
      id: 5,
      firstName: 'John',
      lastName: 'Lenon',
      profession: 'Musician',
      balance: 64,
      type: 'contractor',
    }),
    ProfilesModel.create({
      id: 6,
      firstName: 'Linus',
      lastName: 'Torvalds',
      profession: 'Programmer',
      balance: 1214,
      type: 'contractor',
    }),
    ProfilesModel.create({
      id: 7,
      firstName: 'Alan',
      lastName: 'Turing',
      profession: 'Programmer',
      balance: 22,
      type: 'contractor',
    }),
    ProfilesModel.create({
      id: 8,
      firstName: 'Aragorn',
      lastName: 'II Elessar Telcontarvalds',
      profession: 'Fighter',
      balance: 314,
      type: 'contractor',
    }),
    ContractsModel.create({
      id: 1,
      terms: 'bla bla bla',
      status: 'terminated',
      ClientId: 1,
      ContractorId: 5,
    }),
    ContractsModel.create({
      id: 2,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 1,
      ContractorId: 6,
    }),
    ContractsModel.create({
      id: 3,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 2,
      ContractorId: 6,
    }),
    ContractsModel.create({
      id: 4,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 2,
      ContractorId: 7,
    }),
    ContractsModel.create({
      id: 5,
      terms: 'bla bla bla',
      status: 'new',
      ClientId: 3,
      ContractorId: 8,
    }),
    ContractsModel.create({
      id: 6,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 3,
      ContractorId: 7,
    }),
    ContractsModel.create({
      id: 7,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 4,
      ContractorId: 7,
    }),
    ContractsModel.create({
      id: 8,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 4,
      ContractorId: 6,
    }),
    ContractsModel.create({
      id: 9,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 4,
      ContractorId: 8,
    }),
    JobsModel.create({
      description: 'work',
      price: 200,
      ContractId: 1,
    }),
    JobsModel.create({
      description: 'work',
      price: 201,
      ContractId: 2,
    }),
    JobsModel.create({
      description: 'work',
      price: 202,
      ContractId: 3,
    }),
    JobsModel.create({
      description: 'work',
      price: 200,
      ContractId: 4,
    }),
    JobsModel.create({
      description: 'work',
      price: 200,
      ContractId: 7,
    }),
    JobsModel.create({
      description: 'work',
      price: 2020,
      paid: true,
      paymentDate: '2020-08-15T19:11:26.737Z',
      ContractId: 7,
    }),
    JobsModel.create({
      description: 'work',
      price: 200,
      paid: true,
      paymentDate: '2020-08-15T19:11:26.737Z',
      ContractId: 2,
    }),
    JobsModel.create({
      description: 'work',
      price: 200,
      paid: true,
      paymentDate: '2020-08-16T19:11:26.737Z',
      ContractId: 3,
    }),
    JobsModel.create({
      description: 'work',
      price: 200,
      paid: true,
      paymentDate: '2020-08-17T19:11:26.737Z',
      ContractId: 1,
    }),
    JobsModel.create({
      description: 'work',
      price: 200,
      paid: true,
      paymentDate: '2020-08-17T19:11:26.737Z',
      ContractId: 5,
    }),
    JobsModel.create({
      description: 'work',
      price: 21,
      paid: true,
      paymentDate: '2020-08-10T19:11:26.737Z',
      ContractId: 1,
    }),
    JobsModel.create({
      description: 'work',
      price: 21,
      paid: true,
      paymentDate: '2020-08-15T19:11:26.737Z',
      ContractId: 2,
    }),
    JobsModel.create({
      description: 'work',
      price: 121,
      paid: true,
      paymentDate: '2020-08-15T19:11:26.737Z',
      ContractId: 3,
    }),
    JobsModel.create({
      description: 'work',
      price: 121,
      paid: true,
      paymentDate: '2020-08-14T23:11:26.737Z',
      ContractId: 3,
    }),
  ]);
}
