import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { catchError, from, map, Observable, of } from 'rxjs';

import { CreatePostInputDto } from './dto/create-post.input.dto';
import { UpdatePostInputDto } from './dto/update-post.input.dto';
import { Post, PostDocument } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  /**
   * Finds all the posts given a page and limit.
   *
   * @param {number} page - The page number.
   * @param {number} limit - The number of posts to show per page.
   * @return {Observable<Post[]>} An observable of an array of posts.
   */
  findAll(page: number, limit: number): Observable<Post[]> {
    const skip = page > 0 ? (page - 1) * limit : 0;
    return from(this.postModel.find().sort({ createdAt: -1 }).limit(limit).skip(skip).exec());
  }

  /**
   * Returns an Observable emitting the Post object matching the given id.
   *
   * @param {string} id - The id of the Post to find.
   * @return {Observable<Post>} An Observable emitting the Post object matching the given id.
   */
  findOne(id: string): Observable<Post> {
    return from(this.postModel.findById(id).exec());
  }

  /**
   * Creates a new post using the provided input data.
   *
   * @param {CreatePostInputDto} createPostInput - The input data for creating a new post.
   * @return {Observable<Post>} An observable that emits the newly created post.
   */
  create(createPostInput: CreatePostInputDto): Observable<Post> {
    const newPost = new this.postModel(createPostInput);
    return from(newPost.save());
  }

  /**
   * Updates a post by ID with the provided update input and returns an Observable of the updated post.
   *
   * @param {string} id - The ID of the post to update.
   * @param {UpdatePostInputDto} updatePostInput - The input containing the fields to update.
   * @return {Observable<Post>} An Observable of the updated post.
   */
  update(id: string, updatePostInput: UpdatePostInputDto): Observable<Post> {
    return from(this.postModel.findByIdAndUpdate(id, updatePostInput, { new: true }).exec());
  }

  /**
   * Deletes a post with the given id from the database and returns a boolean
   * indicating whether the deletion was successful or not.
   *
   * @param {string} id - The id of the post to be deleted.
   * @return {Observable<boolean>} - An observable that emits true if the post
   * was deleted and false otherwise.
   */
  delete(id: string): Observable<boolean> {
    return from(this.postModel.findByIdAndDelete(id).exec()).pipe(
      map((deletedPost: Post) => deletedPost !== null),
      catchError(() => of(false)),
    );
  }
}
