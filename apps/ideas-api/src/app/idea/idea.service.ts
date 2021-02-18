import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { IdeaDTO, IdeaRO } from './idea.dto';
import { IdeaEntity } from './idea.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
    @InjectRepository(IdeaEntity)
    private userRepository: Repository<UserEntity>,
    private userService: UserService,
  ) {}

  async showAll(): Promise<IdeaRO[]> {
    const ideas = await this.ideaRepository.find({ relations: ['author'] });
    return ideas.map(idea => this.toResponse(idea));
  }

  async create(data: IdeaDTO, userId: string): Promise<IdeaRO> {
    const user = await this.userRepository.findOne({where: {id: userId}});
    const idea = this.ideaRepository.create({ ...data, author: user });
    await this.ideaRepository.save(idea);
    return this.toResponse(idea);
  }

  async read(id: string): Promise<IdeaRO> {
    const idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!idea) {
      throw new NotFoundException();
    }
    return this.toResponse(idea);
  }

  async update(id: string, data: Partial<IdeaDTO>, userId: string): Promise<IdeaRO> {
    let idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!idea) {
      throw new NotFoundException();
    }

    this.ensureOwnerShip(idea, userId);
    await this.ideaRepository.update({ id }, data);
    idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    return this.toResponse(idea);
  }

  async destroy(id: string, userId: string) {
    const idea = await this.ideaRepository.findOne({ where: { id }, relations: ['author'] });

    if (!idea) {
      throw new NotFoundException();
    }

    this.ensureOwnerShip(idea, userId);
    await this.ideaRepository.delete({ id });
    return { deleted: true };
  }

  private toResponse(idea: IdeaEntity): IdeaRO {
    return { ...idea, author: idea.author.toResponseObject(false) };
  }

  private ensureOwnerShip(idea: IdeaEntity, userId: string) {
    if(idea.author.id !== userId) {
      throw new UnauthorizedException('Incorrect User');
    }
  }
}
