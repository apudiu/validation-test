import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('handles a signup request', () => {
    // note: everytime need to change this email, which will be solved in next branch
    const email = 'asdf101@asdf.com';

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: 'Test User 1',
        email,
        password: 'asdlfkajsd',
      })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body.user;

        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'asdf@asdf.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: 'Test User 2',
        email,
        password: '123456789',
      })
      .expect(201);

    const { body } = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${res.body.accessToken}`)
      .expect(200);

    expect(body.email).toEqual(email);
  });

  afterAll(async () => {
    await app.close();
  });
});
