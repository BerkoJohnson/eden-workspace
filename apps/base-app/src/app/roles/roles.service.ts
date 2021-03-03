import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';
import { Role } from './role.entity';

@Injectable()
export class RolesService extends AbstractService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>, // private permissionService: PermissionsService,
  ) {
    super(roleRepository);
  }
}
