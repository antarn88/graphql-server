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

  findAll(page: number, limit: number): Observable<Post[]> {
    const skip = page > 0 ? (page - 1) * limit : 0;
    return from(this.postModel.find().sort({ createdAt: -1 }).limit(limit).skip(skip).exec());
  }

  findOne(id: string): Observable<Post> {
    return from(this.postModel.findById(id).exec());
  }

  create(createPostInput: CreatePostInputDto): Observable<Post> {
    const newPost = new this.postModel(createPostInput);
    return from(newPost.save());
  }

  update(id: string, updatePostInput: UpdatePostInputDto): Observable<Post> {
    return from(this.postModel.findByIdAndUpdate(id, updatePostInput, { new: true }).exec());
  }

  delete(id: string): Observable<boolean> {
    return from(this.postModel.findByIdAndDelete(id).exec()).pipe(
      map((deletedPost: Post) => deletedPost !== null),
      catchError(() => of(false)),
    );
  }
}
