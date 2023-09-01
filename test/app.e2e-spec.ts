import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';

describe('App e2e', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    //simulating the server
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        //Stripping out what is not defined in our dto
        whitelist: true,
      }),
    );
    //starting the server
    await app.init();
  });
  afterAll(() => {
    app.close();
  });
  it.todo('should pass');
});
