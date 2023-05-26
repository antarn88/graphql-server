import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema({
  versionKey: false,
  timestamps: true,
})
export class Post {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Prop({ required: true })
  title: string;

  @Field(() => String)
  @Prop({ required: true })
  body: string;

  @Field(() => Date, { nullable: true })
  @Prop()
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @Prop()
  updatedAt: Date;
}

export type PostDocument = Post & Document;

export const PostSchema = SchemaFactory.createForClass(Post);
