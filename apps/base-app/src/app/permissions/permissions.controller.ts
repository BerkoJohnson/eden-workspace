import { Controller, Get } from '@nestjs/common';
import { PermissionsService } from './permissions.service';

@Controller('api/permissions')
export class PermissionsController {
  constructor(private permissionService: PermissionsService) {}

  @Get()
  all() {
    return this.permissionService.all();
  }
}
