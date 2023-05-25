import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Post {
  @Field(() => String)
  @Prop({ required: true })
  title: string;

  @Field(() => String)
  @Prop({ required: true })
  body: string;
}

export type PostDocument = Post & Document;

export const PostSchema = SchemaFactory.createForClass(Post);
