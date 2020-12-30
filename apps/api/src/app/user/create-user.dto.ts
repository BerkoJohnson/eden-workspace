import { IsString, IsEmail, Matches, IsIn } from "class-validator";
import { ROLES } from "../roles/role.enum";

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;

  @IsIn([ROLES.USER, ROLES.ADMIN, ROLES.SUPERADMIN])
  role: ROLES;
}
