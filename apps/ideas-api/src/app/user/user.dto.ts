import { IsNotEmpty, ValidationArguments } from 'class-validator';
import { IdeaRO } from '../idea/idea.dto';

export class UserDto {
  @IsNotEmpty({
    message: (args: ValidationArguments) => {
      return `${args.property} should not be empty`;
    }
  })
  username: string;

  @IsNotEmpty({
    message: (args: ValidationArguments) => {
      return `${args.property} should not be empty`;
    },
  })
  password: string;
}

export class UserRO {
  id: string;
  username: string;
  created: Date;
  token?: string;
  ideas: IdeaRO[]
}
