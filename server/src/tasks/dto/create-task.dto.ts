import { IsString, IsOptional, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
