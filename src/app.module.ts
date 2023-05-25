import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(
      [
        'mongodb+srv://',
        `${process.env.DB_USER}:`,
        `${process.env.DB_PASSWORD}@`,
        `${process.env.DB_HOST}/`,
        `${process.env.DB_NAME}`,
        '?retryWrites=true&w=majority',
      ].join(''),
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
