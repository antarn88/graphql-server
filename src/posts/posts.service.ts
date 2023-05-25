import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePostInputDto } from './dto/create-post.input.dto';
import { UpdatePostInputDto } from './dto/update-post.input.dto';
import { Post, PostDocument } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findAll(page: number, limit: number): Promise<Post[]> {
    const skip = page > 0 ? (page - 1) * limit : 0;
    return await this.postModel.find().limit(limit).skip(skip).exec();
  }

  async findOne(id: string): Promise<Post> {
    return await this.postModel.findById(id).exec();
  }

  async create(createPostInput: CreatePostInputDto): Promise<Post> {
    const newPost = new this.postModel(createPostInput);
    return await newPost.save();
  }

  async update(id: string, updatePostInput: UpdatePostInputDto): Promise<Post> {
    return await this.postModel.findByIdAndUpdate(id, updatePostInput, { new: true }).exec();
  }

  async delete(id: string): Promise<Post> {
    return await this.postModel.findByIdAndDelete(id).exec();
  }
}
