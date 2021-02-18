import { IsString, IsEmail, Matches, IsIn } from 'class-validator';
import { ROLES } from './roles.enum';

export interface IUser {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}
export type UserList = IUser[];

export interface AuthenticatedUser {
  firstName: string;
  lastName: string;
  email: string;
  role: ROLES;
}


export class CreateUserDto {
  // @IsString()
  firstName: string;

  // @IsString()
  lastName: string;

  // @IsEmail()
  email: string;

  // @IsString()
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;

  // @IsIn([ROLES.USER, ROLES.ADMIN, ROLES.SUPERADMIN])
  role: ROLES;
}
