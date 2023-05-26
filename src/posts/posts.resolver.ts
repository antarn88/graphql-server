import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { CreatePostInputDto } from './dto/create-post.input.dto';
import { UpdatePostInputDto } from './dto/update-post.input.dto';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  /**
   * Finds all posts based on the given pagination parameters.
   *
   * @param {number} page - The page number to retrieve (nullable).
   * @param {number} limit - The number of items per page (nullable).
   * @return {Promise<Post[]>} A promise that resolves to an array of Post objects.
   */
  @Query(() => [Post], { name: 'posts' })
  async findAll(
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
  ): Promise<Post[]> {
    return await this.postsService.findAll(page, limit);
  }

  /**
   * Asynchronously finds and returns a single post with the given id.
   *
   * @param {String} id - The id of the post to find.
   * @return {Promise<Post>} A promise that resolves to the post with the given id.
   */
  @Query(() => Post, { name: 'post' })
  async findOne(@Args('id', { type: () => String }) id: string): Promise<Post> {
    return await this.postsService.findOne(id);
  }

  /**
   * Creates a new Post using the provided CreatePostInputDto object.
   *
   * @async
   * @param {CreatePostInputDto} createPostInputDto - object containing the data for the new Post
   * @return {Promise<Post>} Returns a Promise that resolves with the newly created Post object
   */
  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostInputDto: CreatePostInputDto): Promise<Post> {
    return await this.postsService.create(createPostInputDto);
  }

  /**
   * Updates a post given its ID and the desired changes specified in updatePostInputDto.
   *
   * @param {string} id - The ID of the post to update.
   * @param {UpdatePostInputDto} updatePostInputDto - The desired changes to apply to the post.
   * @return {Promise<Post>} The updated post.
   */
  @Mutation(() => Post)
  async updatePost(
    @Args('id', { type: () => String }) id: string,
    @Args('updatePostInput') updatePostInputDto: UpdatePostInputDto,
  ): Promise<Post> {
    return await this.postsService.update(id, updatePostInputDto);
  }

  /**
   * Deletes a post with the specified ID.
   *
   * @param {string} id - The ID of the post to delete.
   * @return {Promise<boolean>} - A promise that resolves to true if the post is successfully deleted, otherwise false.
   */
  @Mutation(() => Boolean)
  async deletePost(@Args('id', { type: () => String }) id: string): Promise<boolean> {
    return await this.postsService.delete(id);
  }
}
