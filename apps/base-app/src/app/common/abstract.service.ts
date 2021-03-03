import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginatedResult } from '../shared/paginated-result.interface';

@Injectable()
export abstract class AbstractService {
  protected constructor(protected readonly repository: Repository<any>) {}

  async create(data: any): Promise<any> {
    return await this.repository.save(data);
  }

  async findOne(condition: any, relations: string[] = []): Promise<any> {
    return await this.repository.findOne(condition, { relations });
  }

  async all(relations: string[] = []): Promise<any[]> {
    return await this.repository.find({
      relations,
    });
  }

  async paginate(page = 1, relations: string[] = []): Promise<PaginatedResult> {
    const take = 15;

    const [data, total] = await this.repository.findAndCount({
      take,
      skip: (page - 1) * take,
      relations,
    });

    return {
      data: data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async update(id: string, data: any): Promise<any> {
    return await this.repository.update(id, data);
  }

  async delete(id: string): Promise<any> {
    return await this.repository.delete(id);
  }
}
