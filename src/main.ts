import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';

import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(morgan(process.env.MORGAN_FORMAT || 'dev'));

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
