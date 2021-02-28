import { IsNotEmpty } from 'class-validator';

export class ElectionDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  academic_year: string;
}
