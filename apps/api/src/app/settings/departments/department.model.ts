import { IsArray, IsString} from 'class-validator';

// students => programmes
// teachers => departments

export class CreateDepartmentDto {

  @IsString()
  title: string;

  @IsString()
  hod: string;

  @IsArray()
  subjects: string[]
}


