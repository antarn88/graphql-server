import { Field, InputType } from '@nestjs/graphql';

import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreatePostInputDto {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  body: string;
}
