import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';
import { PaginatedResult } from '../shared/paginated-result.interface';
import { User } from './user.entity';

@Injectable()
export class UsersService extends AbstractService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async paginate(page = 1): Promise<PaginatedResult> {
    const { data, meta } = await super.paginate(page, ['role']);

    return {
      data: data.map(u => u.toResponse()),
      meta,
    };
  }
}
