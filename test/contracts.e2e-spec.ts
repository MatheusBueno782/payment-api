import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { ContractsModel } from '../src/contracts/models/contracts.model';
import { AppModule } from '../src/app.module';

/**
 * This is not a proper e2e test, we relay on the dev database, require to be previously seeded, and have no isolation.
 * However, I would like to show the api working without using curl or postman.
 */
describe('contractController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ContractsModel],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Given /contracts (get)', () => {
    // the best approach here would be testing the guard it in a unit test, but, no time :/.
    describe('When calling without profile_id header', () => {
      it(' Should respond with Unauthorized', () => {
        return request(app.getHttpServer())
          .get('/contracts')
          .expect(401)
          .expect({
            statusCode: 401,
            message: 'profile_id not in the headers',
          });
      });
    });

    describe('When calling with correct arguments', () => {
      it('Should answer with a lists of expected contract related to the profile', () => {
        const profileId = '1';

        return request(app.getHttpServer())
          .get('/contracts')
          .set('profile_id', profileId)
          .expect(200)
          .then((res) => {
            const contracts: Array<ContractsModel> = res.body;
            contracts.forEach((contract) => {
              const belongsToProfile =
                contract.ContractorId === Number(profileId) ||
                contract.ClientId === Number(profileId);
              expect(belongsToProfile).toBe(true);
            });
          });
      });
    });
  });
});
