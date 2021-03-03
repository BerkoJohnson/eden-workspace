import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PermissionsService } from '../permissions/permissions.service';
import { CreateRoleDto, UpdateRoleDto } from './role.dto';
import { RolesService } from './roles.service';

@Controller('api/roles')
export class RolesController {
  constructor(
    private roleService: RolesService,
    private permissionService: PermissionsService,
  ) {}

  @Post()
  async create(@Body() data: CreateRoleDto) {
    const { name, permissions } = data;
    const permissionsArray = await this.permissionService.findPermissions(
      permissions,
    );

    return this.roleService.create({
      name,
      permissions: permissionsArray,
    });
  }

  @Get()
  async all() {
    return this.roleService.all();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateRoleDto) {
    const { name, permissions } = data;

    const updateData: any = {};

    if (name) {
      updateData.name = name;
    }

    if (permissions && permissions.length >= 1) {
      const permissionsArray = await this.permissionService.findPermissions(
        permissions,
      );
      updateData.permissions = permissionsArray;
    }
    await this.roleService.update(id, updateData);
    return this.roleService.findOne({ id });
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return this.roleService.findOne({ id }, ['permissions']);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.roleService.delete(id);
  }
}
