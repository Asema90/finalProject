import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateChildGrowthHistoryDto {
  @IsNotEmpty()
  @IsOptional()
  childId?: string;

  @IsNotEmpty()
  @IsOptional()
  parentUsername?: string;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsNumber()
  @IsOptional()
  headCircumference?: number;

  @IsNumber()
  @IsNotEmpty()
  height: number;
}
