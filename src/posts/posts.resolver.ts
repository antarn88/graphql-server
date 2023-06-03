import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { firstValueFrom } from 'rxjs';
import { Inject } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';

import { PUB_SUB } from 'src/pub-sub/pub-sub.module';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { CreatePostInputDto } from './dto/create-post.input.dto';
import { UpdatePostInputDto } from './dto/update-post.input.dto';

@Resolver(() => Post)
export class PostsResolver {
  constructor(@Inject(PUB_SUB) private pubSub: PubSubEngine, private postsService: PostsService) {}

  @Query(() => [Post], { name: 'posts' })
  async findAll(
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
  ): Promise<Post[]> {
    return await firstValueFrom(this.postsService.findAll(page, limit));
  }

  @Query(() => Post, { name: 'post' })
  async findOne(@Args('id', { type: () => String }) id: string): Promise<Post> {
    return await firstValueFrom(this.postsService.findOne(id));
  }

  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostInputDto: CreatePostInputDto): Promise<Post> {
    const newPost = await firstValueFrom(this.postsService.create(createPostInputDto));
    const newPostPayload: Post = {
      id: newPost.id,
      title: newPost.title,
      body: newPost.body,
      createdAt: newPost.createdAt,
      updatedAt: newPost.updatedAt,
    };

    this.pubSub.publish('newPost', { newPost: newPostPayload });
    return newPost;
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('id', { type: () => String }) id: string,
    @Args('updatePostInput') updatePostInputDto: UpdatePostInputDto,
  ): Promise<Post> {
    return await firstValueFrom(this.postsService.update(id, updatePostInputDto));
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('id', { type: () => String }) id: string): Promise<boolean> {
    return await firstValueFrom(this.postsService.delete(id));
  }

  @Subscription(() => Post)
  newPost(): AsyncIterator<Post> {
    return this.pubSub.asyncIterator<Post>('newPost');
  }
}
