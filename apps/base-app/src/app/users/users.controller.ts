import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RolesService } from '../roles/roles.service';
import { PaginatedResult } from '../shared/paginated-result.interface';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private roleService: RolesService,
  ) {}

  @Post()
  async create(@Body() data: CreateUserDto): Promise<User> {
    const { role, password_confirm, ...others } = data;
    if (data.password !== password_confirm) {
      throw new BadRequestException('Passwords do not match');
    }

    const user = await this.userService.findOne({
      email: data.email,
    });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const roleFound = await this.roleService.findOne({ id: role });

    if (!roleFound) {
      throw new BadRequestException('Role does not exist');
    }

    const newUserData: any = {
      ...others,
      role: roleFound,
    };
    return await this.userService.create(newUserData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    const { role, ...others } = data;
    const updateData: any = {
      ...others,
    };
    // if role is changed then ... fetch new role, save the update.
    if (role) {
      const foundRole = await this.roleService.findOne({ id: role });

      if (!foundRole) {
        throw new BadRequestException('Role does not exist!');
      }
      updateData.role = foundRole;
    }

    await this.userService.update(id, updateData);
    return this.userService.findOne({ id });
  }

  @Get()
  async all(@Query('page') page: number): Promise<PaginatedResult> {
    return await this.userService.paginate(page);
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne({ id }, ['role']);
    return user.toResponse();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
