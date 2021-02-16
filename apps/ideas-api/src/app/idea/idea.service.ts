import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdeaDTO } from './idea.dto';
import { IdeaEntity } from './idea.entity';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
  ) {}

  async showAll() {
    return await this.ideaRepository.find();
  }

  async create(data: IdeaDTO) {
    const idea = this.ideaRepository.create(data);
    await this.ideaRepository.save(idea);
    return idea;
  }

  async read(id: string) {
    const idea = await this.ideaRepository.findOne({ where: { id } });
    if (!idea) {
      throw new NotFoundException();
    }
    console.log(idea);

    return idea;
  }

  async update(id: string, data: Partial<IdeaDTO>) {
    const idea = await this.ideaRepository.findOne({where: {id}});

    if(!idea) {
      throw new NotFoundException();
    }
    await this.ideaRepository.update({ id }, data);
    return idea;
  }

  async destroy(id: string) {

    const idea = await this.ideaRepository.findOne({where: {id}});

    if(!idea) {
      throw new NotFoundException();
    }

    await this.ideaRepository.delete({ id });
    return { deleted: true };
  }
}
