import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { Post, PostSchema } from './entities/post.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
  providers: [PostsService, PostsResolver],
})
export class PostsModule {}
