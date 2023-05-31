import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { firstValueFrom } from 'rxjs';

import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { CreatePostInputDto } from './dto/create-post.input.dto';
import { UpdatePostInputDto } from './dto/update-post.input.dto';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  /**
   * Asynchronously finds all posts.
   *
   * @param {number} page - The page number to retrieve posts from. Can be null.
   * @param {number} limit - The maximum number of posts to retrieve per page. Can be null.
   * @return {Promise<Post[]>} A promise that resolves to an array of Post objects.
   */
  @Query(() => [Post], { name: 'posts' })
  async findAll(
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
  ): Promise<Post[]> {
    return await firstValueFrom(this.postsService.findAll(page, limit));
  }

  /**
   * Asynchronously finds a single post by its ID.
   *
   * @param {string} id - The ID of the post to find.
   * @return {Promise<Post>} A Promise that resolves with the found post.
   */
  @Query(() => Post, { name: 'post' })
  async findOne(@Args('id', { type: () => String }) id: string): Promise<Post> {
    return await firstValueFrom(this.postsService.findOne(id));
  }

  /**
   * Asynchronously creates a new post from the provided input DTO.
   *
   * @param {CreatePostInputDto} createPostInputDto - The input DTO containing the details of the post to be created.
   * @return {Promise<Post>} A Promise that resolves with the created post.
   */
  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostInputDto: CreatePostInputDto): Promise<Post> {
    return await firstValueFrom(this.postsService.create(createPostInputDto));
  }

  /**
   * Updates a post with the given ID and returns the updated post.
   *
   * @param {string} id - The ID of the post to update.
   * @param {UpdatePostInputDto} updatePostInputDto - The data to update the post with.
   * @returns {Promise<Post>} A Promise that resolves to the updated post.
   */
  @Mutation(() => Post)
  async updatePost(
    @Args('id', { type: () => String }) id: string,
    @Args('updatePostInput') updatePostInputDto: UpdatePostInputDto,
  ): Promise<Post> {
    return await firstValueFrom(this.postsService.update(id, updatePostInputDto));
  }

  /**
   * Deletes a post with the given id.
   *
   * @param {string} id - The id of the post to be deleted.
   * @return {Promise<boolean>} A Promise that resolves to true if the post was successfully deleted, and false otherwise.
   */
  @Mutation(() => Boolean)
  async deletePost(@Args('id', { type: () => String }) id: string): Promise<boolean> {
    return await firstValueFrom(this.postsService.delete(id));
  }
}
