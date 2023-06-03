import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import * as dotenv from 'dotenv';

import { PostsModule } from './posts/posts.module';
import { PubSubModule } from './pub-sub/pub-sub.module';

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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    PostsModule,
    PubSubModule,
  ],
})
export class AppModule {}
