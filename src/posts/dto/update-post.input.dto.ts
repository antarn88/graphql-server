import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdatePostInputDto {
  @Field()
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsOptional()
  @IsNotEmpty()
  body: string;
}
