import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Observable, take } from 'rxjs';

import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { CreatePostInputDto } from './dto/create-post.input.dto';
import { UpdatePostInputDto } from './dto/update-post.input.dto';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  /**
   * Finds all posts given a page and limit and returns them as an Observable of Post array.
   *
   * @param {number} page - The page number to retrieve. Nullable.
   * @param {number} limit - The maximum number of posts to retrieve per page. Nullable.
   * @return {Observable<Post[]>} An observable of an array of Posts.
   */
  @Query(() => [Post], { name: 'posts' })
  findAll(
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
  ): Observable<Post[]> {
    return this.postsService.findAll(page, limit).pipe(take(1));
  }

  /**
   * Retrieves a single Post object based on the provided id.
   *
   * @param {string} id - The id of the Post object to retrieve.
   * @return {Observable<Post>} An Observable emitting the retrieved Post object.
   */
  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => String }) id: string): Observable<Post> {
    return this.postsService.findOne(id).pipe(take(1));
  }

  /**
   * Creates a new post.
   *
   * @param {CreatePostInputDto} createPostInputDto - The input data for creating a post.
   * @return {Observable<Post>} An observable containing the newly created post.
   */
  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInputDto: CreatePostInputDto): Observable<Post> {
    return this.postsService.create(createPostInputDto).pipe(take(1));
  }

  /**
   * Updates a post with the given id using the provided data.
   *
   * @param {string} id - The id of the post to update.
   * @param {UpdatePostInputDto} updatePostInputDto - The data to update the post with.
   * @return {Observable<Post>} An observable of the updated post.
   */
  @Mutation(() => Post)
  updatePost(
    @Args('id', { type: () => String }) id: string,
    @Args('updatePostInput') updatePostInputDto: UpdatePostInputDto,
  ): Observable<Post> {
    return this.postsService.update(id, updatePostInputDto).pipe(take(1));
  }

  /**
   * Deletes a post with the given id.
   *
   * @param {string} id - The id of the post to be deleted.
   * @return {Observable<boolean>} - An observable that emits a boolean indicating if the post was deleted successfully.
   */
  @Mutation(() => Boolean)
  deletePost(@Args('id', { type: () => String }) id: string): Observable<boolean> {
    return this.postsService.delete(id).pipe(take(1));
  }
}
