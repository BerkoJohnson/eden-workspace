import { IsString } from 'class-validator';
import { UserRO } from '../user/user.dto';

export class IdeaDTO {
  @IsString()
  idea: string;

  @IsString()
  description: string;
}

export interface IdeaRO {
  idea: string;
  description: string;
  author: UserRO;
  id: string;
  created: Date;
  updated: Date;
}
