import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { CreatePostInputDto } from './dto/create-post.input.dto';
import { UpdatePostInputDto } from './dto/update-post.input.dto';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Post], { name: 'posts' })
  async findAll(
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
  ): Promise<Post[]> {
    return await this.postsService.findAll(page, limit);
  }

  @Query(() => Post, { name: 'post' })
  async findOne(@Args('id', { type: () => String }) id: string): Promise<Post> {
    return await this.postsService.findOne(id);
  }

  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostInputDto: CreatePostInputDto): Promise<Post> {
    return await this.postsService.create(createPostInputDto);
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('id', { type: () => String }) id: string,
    @Args('updatePostInput') updatePostInputDto: UpdatePostInputDto,
  ): Promise<Post> {
    return await this.postsService.update(id, updatePostInputDto);
  }

  @Mutation(() => Post)
  async deletePost(@Args('id', { type: () => String }) id: string): Promise<Post> {
    return await this.postsService.delete(id);
  }
}
