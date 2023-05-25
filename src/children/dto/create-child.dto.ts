import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChildDto {
  @IsNotEmpty()
  @IsOptional()
  parentUsername?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  birthday: Date;

  @IsOptional()
  @IsString()
  photo?: string;
}
