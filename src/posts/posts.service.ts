import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePostInputDto } from './dto/create-post.input.dto';
import { UpdatePostInputDto } from './dto/update-post.input.dto';
import { Post, PostDocument } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  /**
   * Retrieves all posts with pagination.
   *
   * @param {number} page - The page number to retrieve.
   * @param {number} limit - The maximum number of posts to retrieve per page.
   * @return {Promise<Post[]>} A promise that resolves to an array of Post objects.
   */
  async findAll(page: number, limit: number): Promise<Post[]> {
    const skip = page > 0 ? (page - 1) * limit : 0;
    return await this.postModel.find().sort({ createdAt: -1 }).limit(limit).skip(skip).exec();
  }

  /**
   * Retrieves a single post by its ID.
   *
   * @param {string} id - the ID of the post to retrieve.
   * @return {Promise<Post>} a Promise that resolves to the Post object that matches the given ID.
   */
  async findOne(id: string): Promise<Post> {
    return await this.postModel.findById(id).exec();
  }

  /**
   * Creates a new post using the provided input data.
   *
   * @param {CreatePostInputDto} createPostInput - The input data for the new post.
   * @return {Promise<Post>} A promise that resolves to the newly created post.
   */
  async create(createPostInput: CreatePostInputDto): Promise<Post> {
    const newPost = new this.postModel(createPostInput);
    return await newPost.save();
  }

  /**
   * Updates a post with the given ID using the provided data.
   *
   * @param {string} id - The ID of the post to update.
   * @param {UpdatePostInputDto} updatePostInput - The data to update the post with.
   * @return {Promise<Post>} A promise that resolves to the updated post.
   */
  async update(id: string, updatePostInput: UpdatePostInputDto): Promise<Post> {
    return await this.postModel.findByIdAndUpdate(id, updatePostInput, { new: true }).exec();
  }

  /**
   * Deletes a post with the given id from the database.
   *
   * @param {string} id - The id of the post to be deleted.
   * @return {Promise<boolean>} A boolean indicating whether the post was successfully deleted or not.
   */
  async delete(id: string): Promise<boolean> {
    const deletedPost = await this.postModel.findByIdAndDelete(id).exec();
    return deletedPost !== null;
  }
}
