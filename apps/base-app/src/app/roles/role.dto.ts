import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  name: string;

  @IsArray()
  permissions: string[];
}
export class UpdateRoleDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsArray()
  permissions: string[];
}
